import "core-js/stable";
import "regenerator-runtime/runtime";

import { resolve } from "path";
import { Socket } from "socket.io";

import { app, server, io } from "./setup";
import { handleChat, handleRequestMessages } from "./chat";
import { handleRegister, handleConnection } from "./handshake";

app.get("/", (req, res) => {
  const indexHTMLLocation = resolve(`./dist/index.html`);
  console.log(
    `Sending ${indexHTMLLocation} to ${req.connection.remoteAddress}`
  );
  res.sendFile(indexHTMLLocation);
});

io.on("connection", (socket: Socket) => {
  console.log("Hello, friend! 👋");

  handleConnection(socket);
  handleRegister(socket);

  handleChat(socket);
  handleRequestMessages(socket);

  socket.on("disconnect", (socket: Socket) => {
    console.log("Goodbye, friend!");
  });
});

server.listen(3000, () => {
  console.log(`Listening on port 3000 🚀`);
});
