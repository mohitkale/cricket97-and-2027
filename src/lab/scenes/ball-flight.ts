import { createBall, groundEnvironment, stepBall } from '../../sim/ball/ball';
import { PITCH, SIM_DT, WICKET } from '../../sim/units';
import type { LabSceneFactory } from '../scene';

interface Path {
  label: string;
  colour: string;
  /** One point per sim step: distance down the pitch and height, metres. */
  points: { z: number; y: number }[];
}

const DELIVERIES = [
  { label: 'yorker', colour: '#ffd166', down: 1.1 },
  { label: 'full', colour: '#06d6a0', down: 2.4 },
  { label: 'good length', colour: '#4cc9f0', down: 4.2 },
  { label: 'short', colour: '#f78c6b', down: 6.4 },
  { label: 'bouncer', colour: '#ef476f', down: 8.6 },
];

/**
 * Side view of five 138 km/h deliveries from the new ball integrator, released from
 * 2.1 m at the popping crease with different downward speeds. Shows flight, the
 * bounce and the height at which each ball passes the batter.
 */
export const ballFlight: LabSceneFactory = ({ stage }) => {
  const canvas = document.createElement('canvas');
  stage.append(canvas);
  const maybeContext = canvas.getContext('2d');
  if (!maybeContext) throw new Error('2D canvas is not available');
  const g: CanvasRenderingContext2D = maybeContext;

  const env = groundEnvironment('hard');
  const speed = 138 / 3.6;
  const paths: Path[] = DELIVERIES.map(({ label, colour, down }) => {
    const ball = createBall(
      { x: 0, y: 2.1, z: PITCH.poppingCrease },
      { x: 0, y: -down, z: speed },
      { spin: { x: -25, y: 0, z: 0 } },
    );
    const points = [{ z: ball.pos.z, y: ball.pos.y }];
    while (ball.pos.z < PITCH.length + 1.5 && points.length < 400) {
      stepBall(ball, SIM_DT, env);
      points.push({ z: ball.pos.z, y: ball.pos.y });
    }
    return { label, colour, points };
  });
  const duration = Math.max(...paths.map((path) => path.points.length)) * SIM_DT + 0.2;

  function renderAt(t: number): void {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const scale = Math.min(width / (PITCH.length + 4), height / 4.2);
    const x = (z: number) => (width - PITCH.length * scale) / 2 + z * scale;
    const y = (h: number) => height - 40 - h * scale;

    g.fillStyle = '#14202b';
    g.fillRect(0, 0, width, height);
    g.fillStyle = '#c9b182';
    g.fillRect(x(-1.5), y(0), (PITCH.length + 3) * scale, 6);

    g.strokeStyle = '#ffffff33';
    g.fillStyle = '#ffffff99';
    g.font = '11px system-ui, sans-serif';
    for (let h = 1; h <= 3; h++) {
      g.beginPath();
      g.moveTo(x(-1.5), y(h));
      g.lineTo(x(PITCH.length + 1.5), y(h));
      g.stroke();
      g.fillText(`${h} m`, x(-1.5) + 2, y(h) - 3);
    }
    g.fillStyle = '#f4e3b0';
    for (const stumps of [0, PITCH.length]) {
      g.fillRect(x(stumps) - 2, y(WICKET.height), 4, WICKET.height * scale);
    }
    g.strokeStyle = '#ffffff';
    for (const crease of [PITCH.poppingCrease, PITCH.length - PITCH.poppingCrease]) {
      g.beginPath();
      g.moveTo(x(crease), y(0));
      g.lineTo(x(crease), y(0) + 12);
      g.stroke();
    }

    const steps = Math.floor(t / SIM_DT);
    paths.forEach((path, row) => {
      const shown = path.points.slice(0, steps + 1);
      const last = shown[shown.length - 1];
      if (!last) return;
      g.strokeStyle = path.colour;
      g.lineWidth = 2;
      g.beginPath();
      shown.forEach((point, i) => {
        if (i === 0) g.moveTo(x(point.z), y(point.y));
        else g.lineTo(x(point.z), y(point.y));
      });
      g.stroke();
      g.fillStyle = path.colour;
      g.beginPath();
      g.arc(x(last.z), y(last.y), 4, 0, Math.PI * 2);
      g.fill();
      g.fillText(path.label, width - 110, 20 + row * 15);
    });

    g.fillStyle = '#ffffff';
    g.fillText(`138 km/h, release 2.1 m   t = ${t.toFixed(2)} s`, 12, height - 12);
  }

  return { duration, renderAt, dispose: () => canvas.remove() };
};
