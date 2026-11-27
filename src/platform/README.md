# src/platform

Input (keyboard, touch, gamepad), storage, PWA, device tier detection.

`batting-input.ts` turns keys and canvas gestures into the same shot commands. In `/play/`, the left, up and right arrows drive, down defends, and Space lofts a straight drive. A tap defends on touch. A swipe chooses the direction and a longer swipe lofts. The practice gives timing feedback after each ball and uses the selected assist mode for the cue and simulation.
