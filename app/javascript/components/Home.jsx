import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div id="container_all">
    <div id="messageBox">
      <p>Please fall asleep with the following unique astral plane code on a note under your pillow in order to
         begin hosting friends in your dreams:</p>
      <p id="code"></p>
      <Link to="/friends" role="button" id="connect">activate code</Link>
    </div>
  </div>
);