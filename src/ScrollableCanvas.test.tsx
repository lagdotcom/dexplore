import ScrollableCanvas, { RenderCallback } from "./ScrollableCanvas";
import { act, fireEvent, render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function setup() {
  const onPaint = jest.fn<void, Parameters<RenderCallback>>();
  render(<ScrollableCanvas onPaint={onPaint} />);

  const target = screen.getByTestId("scrollable-canvas");
  const user = userEvent.setup();

  return { onPaint, target, user };
}

test("panning behaviour", async () => {
  const { onPaint, target, user } = setup();
  await user.pointer([
    { keys: "[MouseLeft>]", target, coords: { x: 200, y: 100 } },
    { keys: "[/MouseLeft]", target, coords: { x: 100, y: 200 } },
  ]);

  await act(() => delay(200));
  expect(onPaint).toHaveBeenCalled();

  const [, , dx, dy] = onPaint.mock.calls.at(-1) || [0, 0, 0, 0, 1];
  expect(dx).toBe(-100);
  expect(dy).toBe(100);
});

test("zooming behaviour", async () => {
  const { onPaint, target } = setup();

  fireEvent.wheel(target, {
    deltaMode: WheelEvent.DOM_DELTA_PIXEL,
    deltaY: 1000,
  });
  await act(() => delay(200));
  expect(onPaint).toHaveBeenCalled();
  const zout = onPaint.mock.calls.at(-1) || [0, 0, 0, 0, 1];
  expect(zout[4]).toBeLessThan(1);

  fireEvent.wheel(target, {
    deltaMode: WheelEvent.DOM_DELTA_PIXEL,
    deltaY: -2000,
  });
  await act(() => delay(200));
  const zin = onPaint.mock.calls.at(-1) || [0, 0, 0, 0, 1];
  expect(zin[4]).toBeGreaterThan(1);
});
