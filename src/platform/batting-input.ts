type BattingCommand = {
  stroke: 'cover-drive' | 'straight-drive' | 'on-drive' | 'forward-defence';
  lofted: boolean;
};

const keys: Record<string, BattingCommand['stroke']> = {
  ArrowLeft: 'cover-drive',
  ArrowUp: 'straight-drive',
  ArrowRight: 'on-drive',
  ArrowDown: 'forward-defence',
};

export function bindBattingInput(stage: HTMLElement, play: (command: BattingCommand) => void) {
  const keydown = (event: KeyboardEvent) => {
    if (
      event.repeat ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLButtonElement
    )
      return;
    const lofted = event.code === 'Space';
    const stroke = lofted ? 'straight-drive' : keys[event.code];
    if (!stroke) return;
    event.preventDefault();
    play({ stroke, lofted });
  };
  let press: { id: number; x: number; y: number } | null = null;
  const down = (event: PointerEvent) => {
    if (!event.isPrimary || event.target !== stage) return;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  };
  const up = (event: PointerEvent) => {
    if (!press || press.id !== event.pointerId) return;
    const dx = event.clientX - press.x;
    const dy = event.clientY - press.y;
    const distance = Math.hypot(dx, dy);
    press = null;
    const stroke =
      distance < 16
        ? 'forward-defence'
        : dx < -distance * 0.42
          ? 'cover-drive'
          : dx > distance * 0.42
            ? 'on-drive'
            : 'straight-drive';
    play({ stroke, lofted: distance >= Math.min(105, stage.clientWidth * 0.25) });
  };
  const cancel = () => {
    press = null;
  };
  window.addEventListener('keydown', keydown);
  stage.addEventListener('pointerdown', down);
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', cancel);
  return () => {
    window.removeEventListener('keydown', keydown);
    stage.removeEventListener('pointerdown', down);
    stage.removeEventListener('pointerup', up);
    stage.removeEventListener('pointercancel', cancel);
  };
}
