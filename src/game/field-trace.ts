import type { Agent, Point } from '../sim/agents/movement';
import type { FieldObserver, FieldTouch, RunStatus } from '../sim/agents/play';
import type { End, Runner } from '../sim/agents/running';
import type { Vec3 } from '../sim/core/vec';
import type { WicketBreak } from '../sim/match/delivery';
import { PITCH, WICKET } from '../sim/units';

export interface FieldKey {
  time: number;
  x: number;
  z: number;
  dx: number;
  dz: number;
  speed: number;
  distance: number;
}

export interface FieldEvent extends FieldKey {
  kind: FieldTouch;
  ball: Vec3;
  aim: Point | undefined;
}

export interface FieldTrack {
  keys: FieldKey[];
  events: FieldEvent[];
}

export interface FieldTrace {
  track: Map<number, FieldTrack>;
  keeper: number;
  bowler: number;
  running: RunFrame[];
  wicket: { time: number; end: End; out: boolean } | null;
}

type RunnerPose = Pick<Runner, 'z' | 'v' | 'goal' | 'home' | 'turning'> & { travelled: number };
export interface RunFrame extends RunStatus {
  time: number;
  batters: readonly [RunnerPose, RunnerPose];
}

const runnerPose = (
  { z, v, goal, home, turning }: Runner,
  previous: RunnerPose | undefined,
): RunnerPose => ({
  z,
  v,
  goal,
  home,
  turning,
  travelled: previous ? previous.travelled + Math.abs(z - previous.z) : 0,
});

export function runFrameAt(frames: readonly RunFrame[], time: number) {
  let lo = 0;
  let hi = frames.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if ((frames[mid]?.time ?? Infinity) <= time) lo = mid + 1;
    else hi = mid;
  }
  return { current: frames[lo - 1], next: frames[lo] };
}

export function returnedWicket(wicket: FieldTrace['wicket']): WicketBreak | null {
  if (!wicket) return null;
  const striker = wicket.end === 'striker';
  return {
    t: wicket.time,
    end: wicket.end,
    at: { x: 0, y: WICKET.height, z: striker ? PITCH.length : 0 },
    vel: { x: 0, y: 0, z: striker ? 1 : -1 },
  };
}

/** Copy presentation data out of the mutable 120 Hz sim, retaining exact contact times. */
export function recordField(keeper: number, bowler: number) {
  const trace: FieldTrace = { track: new Map(), keeper, bowler, running: [], wicket: null };
  const snapshot = (time: number, agent: Agent, distance: number): FieldKey => ({
    time,
    x: agent.pos.x,
    z: agent.pos.z,
    dx: agent.heading.x,
    dz: agent.heading.z,
    speed: agent.speed,
    distance,
  });
  let last = -1;
  const observer: FieldObserver = {
    frame(time, agents) {
      if (time - last < 1 / 60 - 1e-8) return;
      last = time;
      for (const actor of agents) {
        let track = trace.track.get(actor.id);
        if (!track) {
          track = { keys: [], events: [] };
          trace.track.set(actor.id, track);
        }
        const previous = track.keys.at(-1);
        const travelled = previous
          ? (previous.speed + actor.speed) * (time - previous.time) * 0.5
          : 0;
        track.keys.push(snapshot(time, actor, travelled + (previous?.distance ?? 0)));
      }
    },
    touch(time, actor, kind, ball, aim) {
      const track = trace.track.get(actor.id);
      if (!track) throw new Error(`Missing trace for fielder ${actor.id}`);
      track.events.push({
        ...snapshot(time, actor, track.keys.at(-1)?.distance ?? 0),
        kind,
        ball: { ...ball },
        aim: aim && { ...aim },
      });
    },
    runners(time, [striker, partner], status) {
      if (trace.running.at(-1)?.time === time) trace.running.pop();
      const previous = trace.running.at(-1)?.batters;
      trace.running.push({
        time,
        ...status,
        batters: [runnerPose(striker, previous?.[0]), runnerPose(partner, previous?.[1])],
      });
    },
    wicket(time, end, out) {
      trace.wicket = { time, end, out };
    },
  };
  return { observer, trace };
}
