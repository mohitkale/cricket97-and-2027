/**
 * The simulation kernel: a fixed-step loop around a pure step function.
 *
 * A simulation is defined by `init` and `step`. The kernel owns the tick counter, the
 * seeded random streams and the input log, and adds what every sim needs on top:
 * events, snapshots, a state hash, prediction and replay.
 *
 * Rules for sim state: plain data only (numbers, strings, booleans, arrays, plain
 * objects). No class instances, Maps, Sets, functions or undefined holes. That is what
 * makes snapshots, hashing and replay exact.
 */
import { SIM_DT } from '../units.ts';
import { hashString, Rng, type RngState } from './prng.ts';

export interface StepContext<State, Input, Event> {
  state: State;
  /** Index of the step being computed. The first step is tick 0. */
  tick: number;
  /** Simulated seconds at the start of this step. */
  time: number;
  dt: number;
  /** Inputs submitted since the previous step, in submission order. */
  inputs: readonly Input[];
  rng: Rng;
  emit(event: Event): void;
}

export interface SimDefinition<State, Input, Event> {
  init(rng: Rng): State;
  /** Advance `state` in place by one fixed step. Must be deterministic. */
  step(context: StepContext<State, Input, Event>): void;
}

export interface TimedEvent<Event> {
  /** Tick of the step that produced the event. */
  tick: number;
  /** Simulated seconds at the end of that step. */
  time: number;
  event: Event;
}

export interface LoggedInput<Input> {
  /** Tick of the step that consumed the input. */
  tick: number;
  input: Input;
}

export interface Snapshot<State> {
  tick: number;
  state: State;
  rng: RngState;
}

export class Kernel<State, Input, Event> {
  readonly dt: number;
  private current: State;
  private ticks = 0;
  private pending: Input[] = [];
  private readonly log: LoggedInput<Input>[] = [];
  private readonly rng: Rng;
  private readonly definition: SimDefinition<State, Input, Event>;
  readonly seed: number;

  constructor(definition: SimDefinition<State, Input, Event>, seed: number, dt = SIM_DT) {
    this.definition = definition;
    this.seed = seed;
    this.dt = dt;
    this.rng = new Rng(seed);
    this.current = definition.init(this.rng);
  }

  /** Number of steps taken so far. */
  get tick(): number {
    return this.ticks;
  }

  /** Simulated seconds elapsed. Computed from the tick so it never accumulates error. */
  get time(): number {
    return this.ticks * this.dt;
  }

  get state(): State {
    return this.current;
  }

  /** Every input consumed so far with the tick that consumed it. Enough to replay the run. */
  get inputLog(): readonly LoggedInput<Input>[] {
    return this.log;
  }

  /** Queue an input for the next step. */
  submit(input: Input): void {
    this.pending.push(input);
  }

  /** Run one fixed step and return the events it produced. */
  step(): TimedEvent<Event>[] {
    const events: TimedEvent<Event>[] = [];
    const tick = this.ticks;
    const inputs = this.pending;
    this.pending = [];
    for (const input of inputs) this.log.push({ tick, input });
    const endTime = (tick + 1) * this.dt;
    this.definition.step({
      state: this.current,
      tick,
      time: tick * this.dt,
      dt: this.dt,
      inputs,
      rng: this.rng,
      emit: (event) => events.push({ tick, time: endTime, event }),
    });
    this.ticks = tick + 1;
    return events;
  }

  /** Run several steps and return all their events in order. */
  run(steps: number): TimedEvent<Event>[] {
    const events: TimedEvent<Event>[] = [];
    for (let i = 0; i < steps; i++) events.push(...this.step());
    return events;
  }

  snapshot(): Snapshot<State> {
    return { tick: this.ticks, state: structuredClone(this.current), rng: this.rng.snapshot() };
  }

  /** Return to a snapshot. Inputs submitted but not yet consumed are discarded. */
  restore(snapshot: Snapshot<State>): void {
    this.ticks = snapshot.tick;
    this.current = structuredClone(snapshot.state);
    this.rng.restore(snapshot.rng);
    this.pending = [];
    while (this.log.length > 0 && (this.log[this.log.length - 1]?.tick ?? -1) >= snapshot.tick) {
      this.log.pop();
    }
  }

  /** Fingerprint of tick, state and random streams. Equal hashes mean equal simulations. */
  hash(): string {
    const text = JSON.stringify([this.ticks, this.current, this.rng.snapshot()]);
    const a = hashString(text);
    const b = hashString(text, 0x9747b28c);
    return a.toString(16).padStart(8, '0') + b.toString(16).padStart(8, '0');
  }

  /**
   * Events of the next `steps` steps assuming no further input, without changing the
   * simulation. Presentation uses this to know ahead of time when the ball will be
   * released, bounce or arrive, so animation can be lined up with those moments.
   */
  predict(steps: number): TimedEvent<Event>[] {
    const saved = this.snapshot();
    const savedPending = this.pending;
    const savedLog = this.log.length;
    this.pending = [];
    const events = this.run(steps);
    this.restore(saved);
    this.log.length = savedLog;
    this.pending = savedPending;
    return events;
  }
}

/** Rebuild a simulation from its seed and input log, then run it up to `untilTick`. */
export function replay<State, Input, Event>(
  definition: SimDefinition<State, Input, Event>,
  seed: number,
  log: readonly LoggedInput<Input>[],
  untilTick: number,
  dt = SIM_DT,
): Kernel<State, Input, Event> {
  const kernel = new Kernel(definition, seed, dt);
  let next = 0;
  while (kernel.tick < untilTick) {
    while (next < log.length && log[next]?.tick === kernel.tick) {
      const entry = log[next];
      if (entry) kernel.submit(entry.input);
      next += 1;
    }
    kernel.step();
  }
  return kernel;
}
