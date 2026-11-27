import type { Agent, Point } from '../sim/agents/movement';
import type { FieldObserver, FieldTouch } from '../sim/agents/play';
import type { Vec3 } from '../sim/core/vec';

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
}

/** Copy presentation data out of the mutable 120 Hz sim, retaining exact contact times. */
export function recordField(keeper: number, bowler: number) {
  const trace: FieldTrace = { track: new Map(), keeper, bowler };
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
  };
  return { observer, trace };
}
