import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import io from "socket.io-client";
import "../src/styles/styles.css";  


const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  
  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 1920,  // Canvas width
      height: 1080, // Canvas height
    });
    setCanvas(newCanvas);

  
    const socket = io("http://localhost:5000");

    // Listen for drawing events from other users
    socket.on("draw", (data) => {
      const { x, y } = data;
      const circle = new fabric.Circle({
        radius: 5,
        left: x,
        top: y,
        fill: "red",
        selectable: false,
      });
      newCanvas.add(circle);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to clear the canvas
  const clearCanvas = () => {
    canvas.clear();
  };

  const saveCanvas = async () => {
    const canvasData = canvas.toDataURL(); 

    // Send canvas data to the backend API to save the session
    const response = await fetch("http://localhost:5000/api/saveSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: canvasData }),
    });

    if (response.ok) {
      console.log("Session saved successfully");
    } else {
      console.error("Failed to save session");
    }
  };

  return (
    <div className="whiteboard-container">
      <canvas id="whiteboard" width="1920" height="1080"></canvas>
      <div className="button-container">
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;