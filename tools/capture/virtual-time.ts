/**
 * Runs inside the captured page before any of its scripts. Replaces the wall clock,
 * animation frames, timers and Math.random with versions the harness controls, so an
 * existing page (such as the prototype) plays back identically on every run.
 *
 * It must be self-contained: Playwright serialises this function into the page.
 */
export function installVirtualTime(seed: number): void {
  let now = 0;
  // Kept so the harness can still wait for the browser to present a real frame.
  const nativeFrame = window.requestAnimationFrame.bind(window);
  let nextId = 0;
  const frames = new Map<number, FrameRequestCallback>();
  const timers = new Map<number, { at: number; every: number | null; run: () => void }>();

  let state = seed >>> 0;
  Math.random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  performance.now = () => now;
  Date.now = () => 1_700_000_000_000 + now;

  window.requestAnimationFrame = (callback) => {
    nextId += 1;
    frames.set(nextId, callback);
    return nextId;
  };
  window.cancelAnimationFrame = (handle) => {
    frames.delete(handle);
  };

  const schedule = (every: boolean) =>
    ((callback: TimerHandler, delay = 0, ...args: unknown[]) => {
      if (typeof callback !== 'function') return 0;
      nextId += 1;
      const wait = Math.max(0, Number(delay) || 0);
      timers.set(nextId, {
        at: now + wait,
        every: every ? Math.max(1, wait) : null,
        run: () => callback(...args),
      });
      return nextId;
    }) as unknown as typeof window.setTimeout;
  window.setTimeout = schedule(false);
  window.setInterval = schedule(true) as unknown as typeof window.setInterval;
  window.clearTimeout = window.clearInterval = ((handle?: number) => {
    if (handle !== undefined) timers.delete(handle);
  }) as typeof window.clearTimeout;

  function step(to: number): void {
    now = to;
    const due = [...timers.entries()]
      .filter(([, timer]) => timer.at <= now)
      .sort(([idA, a], [idB, b]) => a.at - b.at || idA - idB);
    for (const [id, timer] of due) {
      if (timer.every === null) timers.delete(id);
      else timer.at += timer.every;
      timer.run();
    }
    const callbacks = [...frames.values()];
    frames.clear();
    for (const callback of callbacks) callback(now);
  }

  (window as unknown as { __vt: unknown }).__vt = {
    now: () => now,
    /**
     * Advance by `ms` of virtual time, running one animation frame every `frame` ms,
     * then wait until the browser has presented the result so a screenshot sees it.
     */
    advance(ms: number, frame = 1000 / 60): Promise<void> {
      const end = now + ms;
      while (now < end - 1e-6) step(Math.min(end, now + frame));
      return new Promise((presented) => nativeFrame(() => nativeFrame(() => presented())));
    },
  };
}
