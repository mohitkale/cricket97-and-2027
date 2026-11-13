/**
 * A lab scene is a deterministic, time-addressable picture of some part of the game.
 * The capture harness and people both use it: the same seed and time must always
 * produce the same pixels, so scenes never read the wall clock or Math.random.
 */
export interface LabScene {
  /** Length of the scene in seconds. Times passed to renderAt are within [0, duration]. */
  readonly duration: number;
  /** Draw the scene exactly as it is at time t (seconds). May be called in any order. */
  renderAt(t: number): void;
  dispose?(): void;
}

export interface LabSceneContext {
  stage: HTMLElement;
  seed: number;
}

export type LabSceneFactory = (context: LabSceneContext) => LabScene | Promise<LabScene>;

/** What the page exposes on window.__lab for the capture harness. */
export interface LabHandle {
  ready: Promise<void>;
  duration: number;
  renderAt(t: number): void;
}
