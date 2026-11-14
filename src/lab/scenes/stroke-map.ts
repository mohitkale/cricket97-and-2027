import { groundEnvironment, stepBall } from '../../sim/ball/ball';
import { playStroke } from '../../sim/contact/contact';
import { FEEDS, feedBall } from '../../sim/contact/feeds';
import { ASSIST, STROKES, type StrokeId } from '../../sim/contact/strokes';
import { PITCH, SIM_DT } from '../../sim/units';
import type { LabSceneFactory } from '../scene';

interface Shot {
  id: StrokeId;
  timing: number;
  kind: string;
  /** Path of the ball after the bat, seen from above: x across, z down the pitch. */
  path: { x: number; z: number; y: number }[];
}

const TIMINGS = [
  { error: 0, colour: '#c3ff54', label: 'perfect' },
  { error: 0.04, colour: '#ffb454', label: '40 ms late' },
  { error: -0.04, colour: '#54c8ff', label: '40 ms early' },
];

/**
 * Plan view of where every stroke sends its practice delivery, for a right-hander on
 * Pro (no help): perfect timing, 40 ms late and 40 ms early. Late shots drift towards
 * the off side (left), early ones towards leg. A shot that is missing was not hit.
 */
export const strokeMap: LabSceneFactory = ({ stage }) => {
  const canvas = document.createElement('canvas');
  stage.append(canvas);
  const maybeContext = canvas.getContext('2d');
  if (!maybeContext) throw new Error('2D canvas is not available');
  const g: CanvasRenderingContext2D = maybeContext;

  const env = groundEnvironment('hard');
  const shots: Shot[] = [];
  for (const id of Object.keys(STROKES) as StrokeId[]) {
    for (const { error } of TIMINGS) {
      const ball = feedBall(FEEDS[id], env);
      const result = playStroke(ball, env, {
        stroke: id,
        hand: 'right',
        timingError: error,
        assist: ASSIST.pro,
      });
      const path = [{ x: ball.pos.x, z: ball.pos.z, y: ball.pos.y }];
      if (result.kind !== 'miss') {
        for (let i = 0; i < 360; i++) {
          stepBall(ball, SIM_DT, env);
          path.push({ x: ball.pos.x, z: ball.pos.z, y: ball.pos.y });
        }
      }
      shots.push({ id, timing: error, kind: result.kind, path });
    }
  }
  const duration = 3;

  function renderAt(t: number): void {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const radius = 70; // metres from the striker to the edge of the drawing
    const scale = Math.min(width, height) / (2 * radius);
    // Bowler at the top, as on television from behind the batter.
    const px = (x: number) => width / 2 + x * scale;
    const py = (z: number) => height / 2 + (z - (PITCH.length - 1.5)) * scale;

    g.fillStyle = '#2f6b3a';
    g.fillRect(0, 0, width, height);
    g.strokeStyle = '#ffffff55';
    g.beginPath();
    g.arc(px(0), py(PITCH.length / 2), 65 * scale, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#c9b182';
    g.fillRect(px(-PITCH.width / 2), py(0), PITCH.width * scale, PITCH.length * scale);

    const steps = Math.floor(t / SIM_DT);
    g.font = '10px system-ui, sans-serif';
    for (const shot of shots) {
      const colour = TIMINGS.find((entry) => entry.error === shot.timing)?.colour ?? '#fff';
      const shown = shot.path.slice(0, steps + 1);
      const last = shown[shown.length - 1];
      if (!last || shot.path.length < 2) continue;
      g.strokeStyle = colour;
      g.lineWidth = shot.timing === 0 ? 2 : 1;
      g.setLineDash(shot.kind === 'edge' ? [3, 3] : []);
      g.beginPath();
      shown.forEach((point, i) => {
        if (i === 0) g.moveTo(px(point.x), py(point.z));
        else g.lineTo(px(point.x), py(point.z));
      });
      g.stroke();
      g.setLineDash([]);
      if (shot.timing === 0) {
        g.fillStyle = '#ffffff';
        g.fillText(shot.id, px(last.x) + 3, py(last.z) - 3);
      }
    }

    g.fillStyle = '#ffffff';
    g.fillText(
      `right-hander, Pro, t = ${t.toFixed(2)} s   off side is left, bowler at top`,
      10,
      height - 10,
    );
    TIMINGS.forEach((entry, row) => {
      g.fillStyle = entry.colour;
      g.fillText(entry.label, 10, 16 + row * 13);
    });
  }

  return { duration, renderAt, dispose: () => canvas.remove() };
};
