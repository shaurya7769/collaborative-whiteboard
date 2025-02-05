import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const joinRoom = () => {
    if (roomId.trim() !== "") {
      router.push(`/${roomId}`); // Redirect to whiteboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Join a Whiteboard Room</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 mb-2 rounded"
      />
      <button onClick={joinRoom} className="bg-blue-500 text-white p-2 rounded">
        Join Room
      </button>
    </div>
  );
}
