import { useState } from "react";
import { useRouter } from "next/router";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={() => router.push(`/${roomId}`)} className="bg-blue-500 text-white p-2 rounded">
        Join
      </button>
    </div>
  );
}
