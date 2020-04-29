import * as express from "express";
import * as http from "http";
import * as sio from "socket.io";

export const app = express();
app.use(express.static("dist/public"));

export const server = http.createServer(app);

// EngineIO options are passed through, but not typed and declared
// @ts-ignore
export const io = sio(server, {
  serveClient: false,
  wsEngine: "ws", // uws is not supported since it is a native module
});
