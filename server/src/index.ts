import * as express from "express";
import * as http from "http";
import * as sio from "socket.io";
import { resolve } from "path";

const app = express();
const server = http.createServer(app);

// EngineIO options are passed through, but not typed and declared
// @ts-ignore
const io = sio(server, {
  serveClient: false,
  wsEngine: "ws", // uws is not supported since it is a native module
});

server.listen(3000, () => {
  console.log(`Listening on port 3000 🚀`);
});

app.get("/", (req, res) => {
  const indexHTMLLocation = resolve(`./client/index.html`);
  console.log(
    `Sending ${indexHTMLLocation} to ${req.connection.remoteAddress}`
  );
  res.sendFile(indexHTMLLocation);
});

io.on("connection", (socket: sio.Socket) => {
  console.log("Hello, friend!");
  socket.emit("news", { hello: "world" });
});
