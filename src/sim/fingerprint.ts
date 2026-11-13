/**
 * Fingerprints of fixed simulation runs, one per subsystem. `npm run determinism`
 * computes them in Node and in real browsers and fails if any engine disagrees.
 * Add an entry here whenever a new sim subsystem lands.
 */
import { ballFingerprint } from './ball/fingerprint.ts';
import { demoSim } from './core/demo-sim.ts';
import { Kernel } from './core/kernel.ts';

function kernelFingerprint(): string {
  let combined = '';
  for (const seed of [1, 2, 3, 99]) {
    const kernel = new Kernel(demoSim, seed);
    for (let i = 0; i < 6; i++) {
      kernel.submit({ type: 'throw', speed: 24 + i * 3 });
      kernel.run(150);
    }
    combined += kernel.hash();
  }
  return combined;
}

export function simFingerprints(): Record<string, string> {
  return {
    ball: ballFingerprint(),
    kernel: kernelFingerprint(),
  };
}
