const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); 


app.post("/api/saveSession", (req, res) => {
  const { image } = req.body; 

  if (!image) {
    return res.status(400).send("No image data provided");
  }

  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const filePath = path.join(__dirname, "saved_sessions", "session.png");

  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) {
      return res.status(500).send("Failed to save the session");
    }
    res.send("Session saved successfully");
  });
});


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
