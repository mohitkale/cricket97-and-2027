/** Advance one attempted run, returning the position before any state reset. */
export function stepRun(run, dt) {
  if (!run.runActive) return { moved: false, finished: false };
  const returning = !!run.runReturning;
  const position = Math.max(0, Math.min(1, run.runProgress + (returning ? -1 : 1) * dt / 2.7));
  run.runProgress = position;
  let finished = false;
  if (returning && position <= 0) {
    run.runActive = false;
    run.runReturning = false;
    run.queuedRun = false;
    finished = true;
  } else if (!returning && position >= 1) {
    run.runs++;
    run.runProgress = 0;
    run.runActive = !!run.queuedRun;
    run.runAllowed = !!run.queuedRun;
    run.queuedRun = false;
    finished = true;
  }
  return { moved: true, finished, position, returning };
}

/** Decide whether a completed throw is a wicket, a miss, or a safe return. */
export function judgeThrow(run) {
  const betweenCreases = run.runActive && run.runProgress > 0.03 && run.runProgress < 0.96;
  if (!betweenCreases) return 'complete';
  return run.throwAccurate ? 'run-out' : 'missed-active';
}

/** Which runner is closer to the wicket receiving a return? */
export function runnerAtEnd(strikerZ, partnerZ, end) {
  return end === 'bowler'
    ? (strikerZ < partnerZ ? 'striker' : 'partner')
    : (strikerZ > partnerZ ? 'striker' : 'partner');
}

/** Calling back is idempotent: it never starts a run from a standing position. */
export function returnToCrease(run) {
  if (!run.runActive) return false;
  run.runAllowed = false;
  run.queuedRun = false;
  run.runReturning = true;
  return true;
}

/** Call another run now, or queue it while the current run is underway. */
export function requestRun(run) {
  if (run.runActive) {
    if (run.runReturning) return 'returning';
    run.queuedRun = true;
    return 'queued';
  }
  run.runAllowed = true;
  run.runActive = true;
  run.runReturning = false;
  run.runProgress = 0;
  run.queuedRun = false;
  return 'started';
}

/** Down: go back early, queue the next run past halfway, or run from a crease. */
export function callDown(run) {
  if (!run.runActive) return requestRun(run);
  if (run.runReturning) return 'returning';
  if (run.runProgress >= .5) return requestRun(run);
  returnToCrease(run);
  return 'back';
}

// Runs for a boundary overthrow depend on crossing at the instant of the throw.
export function overthrowAllowance(run){
  return 4+run.runs+Number(!!run.runActive && !run.runReturning && run.runProgress>.5);
}
