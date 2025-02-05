import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { SketchPicker } from "react-color";
import { fabric } from 'fabric';



const socket = io("http://localhost:5000"); // Connect to backend

export default function WhiteboardPage() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const { id: roomId } = router.query;
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = 5;

    socket.emit("join-room", roomId);

    socket.on("draw", (data) => {
      canvas.loadFromJSON(data, canvas.renderAll.bind(canvas));
    });

    canvas.on("path:created", () => {
      socket.emit("draw", JSON.stringify(canvas.toJSON()));
    });

    return () => {
      socket.off("draw");
    };
  }, [roomId, color]);

  return (
    <div className="flex flex-col items-center">
      <SketchPicker color={color} onChange={(e) => setColor(e.hex)} />
      <canvas ref={canvasRef} width={800} height={500} className="border mt-4" />
    </div>
  );
}
