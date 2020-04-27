import * as React from "react";
import { render } from "react-dom";

import * as sio from "socket.io-client";

render(<div>Whaddup Bitch, we loaded</div>, document.getElementById("app"));

const maSock = sio.connect("/api");

setTimeout(() => {
  maSock.disconnect();
}, 5000);
