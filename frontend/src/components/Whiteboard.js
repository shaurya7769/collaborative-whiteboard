import React, { useRef, useEffect, useState } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    if (!context) return;
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };

  // ✅ Clears the Canvas
  const clearCanvas = () => {
    if (!context) return;
    context.clearRect(0, 0, 1920, 1080);
  };

  // ✅ Saves Canvas as Image
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "whiteboard.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Collaborative Whiteboard</h1>
      
      {/* Whiteboard Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border border-gray-300 bg-white"
      />

      {/* Buttons for Clear & Save */}
      <div className="mt-4 flex space-x-4">
        <button onClick={clearCanvas} className="bg-red-500 text-white px-4 py-2 rounded">
          Clear
        </button>
        <button onClick={saveCanvas} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;
