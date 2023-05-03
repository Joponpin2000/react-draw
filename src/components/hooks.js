import { useEffect, useRef } from "react";

export const useOnDraw = (handleDraw) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const mouseUpListenerRef = useRef(null);
  const mouseDownListenerRef = useRef(null);
  const mouseMoveListenerRef = useRef(null);
  const prevPointRef = useRef(null);

  const handleCanvasRef = (ref) => {
    if (!ref) return;

    if (canvasRef.current) {
      canvasRef.current.removeEventListener(
        "mousedown",
        mouseDownListenerRef.current
      );
    }

    canvasRef.current = ref;
    initMouseUpListener();
    initMouseMoveListener();
    initMouseDownListener();
  };

  const mouseDownListener = () => (isDrawingRef.current = true);

  const mouseUpListener = () => {
    isDrawingRef.current = false;
    prevPointRef.current = null;
  };

  const mouseMoveListener = (e) => {
    if (isDrawingRef.current) {
      const point = computePointInCanvas(e.clientX, e.clientY);

      const ctx = canvasRef.current.getContext("2d");

      if (handleDraw) {
        handleDraw(ctx, point, prevPointRef.current);
      }
      prevPointRef.current = point;
    }
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const computePointInCanvas = (clientX, clientY) => {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();

      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    } else {
      return null;
    }
  };

  const initMouseMoveListener = () => {
    if (!canvasRef.current) return;

    mouseMoveListenerRef.current = mouseMoveListener;

    window.addEventListener("mousemove", mouseMoveListener);
  };

  const initMouseDownListener = () => {
    if (!canvasRef.current) return;

    mouseDownListenerRef.current = mouseDownListener;

    canvasRef.current.addEventListener("mousedown", mouseDownListener);
  };

  const initMouseUpListener = () => {
    if (!canvasRef.current) return;

    mouseUpListenerRef.current = mouseUpListener;

    window.addEventListener("mouseup", mouseUpListener);
  };

  useEffect(() => {
    return () => {
      // if (mouseMoveListenerRef.current) {
      //   window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      // }
      // if (mouseUpListenerRef.current) {
      //   window.removeEventListener("mouseup", mouseUpListenerRef.current);
      // }
    };
  }, []);

  return { clearCanvas, handleCanvasRef };
};
