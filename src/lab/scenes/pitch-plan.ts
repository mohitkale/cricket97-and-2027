import { BALL, PITCH, WICKET } from '../../sim/units';
import type { LabSceneFactory } from '../scene';

/**
 * Plan view of the pitch drawn to scale from the sim constants, with a marker
 * travelling from one wicket to the other. It exists to prove the lab and capture
 * contract end to end and to give a visual check on the dimensions.
 */
export const pitchPlan: LabSceneFactory = ({ stage }) => {
  const canvas = document.createElement('canvas');
  stage.append(canvas);
  const maybeContext = canvas.getContext('2d');
  if (!maybeContext) throw new Error('2D canvas is not available');
  const g: CanvasRenderingContext2D = maybeContext;
  const duration = 2;

  function renderAt(t: number): void {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Metres to pixels, leaving a margin around the 22 yards.
    const scale = Math.min(width / (PITCH.length + 6), height / (PITCH.width + 5));
    const x = (z: number) => width / 2 + (z - PITCH.length / 2) * scale;
    const y = (lateral: number) => height / 2 + lateral * scale;

    g.fillStyle = '#2f6b3a';
    g.fillRect(0, 0, width, height);
    g.fillStyle = '#c9b182';
    g.fillRect(x(-1.5), y(-PITCH.width / 2), (PITCH.length + 3) * scale, PITCH.width * scale);

    g.strokeStyle = '#ffffff';
    g.lineWidth = Math.max(1, 0.05 * scale);
    for (const [stumps, direction] of [
      [0, 1],
      [PITCH.length, -1],
    ] as const) {
      const popping = stumps + direction * PITCH.poppingCrease;
      line(stumps, -PITCH.returnCrease, stumps, PITCH.returnCrease); // bowling crease
      line(popping, -PITCH.width / 2, popping, PITCH.width / 2); // popping crease
      for (const side of [-1, 1]) {
        line(
          popping,
          side * PITCH.returnCrease,
          stumps - direction * 1.22,
          side * PITCH.returnCrease,
        );
      }
      g.fillStyle = '#f4e3b0';
      for (const offset of [-1, 0, 1]) {
        dot(
          stumps,
          (offset * (WICKET.width - 2 * WICKET.stumpRadius)) / 2,
          WICKET.stumpRadius * 2.5,
        );
      }
    }

    const progress = Math.min(1, Math.max(0, t / duration));
    g.fillStyle = '#b3261e';
    dot(progress * PITCH.length, 0, BALL.radius * 4);

    g.fillStyle = '#ffffff';
    g.font = '14px system-ui, sans-serif';
    g.fillText(
      `pitch ${PITCH.length} m x ${PITCH.width} m   t = ${t.toFixed(2)} s`,
      12,
      height - 14,
    );

    function line(z1: number, l1: number, z2: number, l2: number): void {
      g.beginPath();
      g.moveTo(x(z1), y(l1));
      g.lineTo(x(z2), y(l2));
      g.stroke();
    }
    function dot(z: number, lateral: number, radius: number): void {
      g.beginPath();
      g.arc(x(z), y(lateral), Math.max(2, radius * scale), 0, Math.PI * 2);
      g.fill();
    }
  }

  return { duration, renderAt, dispose: () => canvas.remove() };
};
