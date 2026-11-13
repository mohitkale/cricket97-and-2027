import type { LabHandle } from '../../src/lab/scene';

declare global {
  interface Window {
    __lab?: LabHandle;
    __vt: { now(): number; advance(ms: number, frame?: number): Promise<void> };
  }
}
