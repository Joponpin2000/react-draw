import { useOnDraw } from "./hooks";
import { useEffect } from "react";

const Canvas = ({ width, height }) => {
  const handleDraw = (ctx, point, prevPoint) => {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  };

  const drawLine = (start, end, ctx, color, width) => {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);

    ctx.fill();
  };

  const { clearCanvas, handleCanvasRef } = useOnDraw(handleDraw);

  useEffect(() => {
    return () => clearCanvas();
  }, [clearCanvas]);

  return (
    <canvas
      width={width}
      height={height}
      style={canvasStyle}
      ref={handleCanvasRef}
    />
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
};
