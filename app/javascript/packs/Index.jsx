import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});

window.onload = function () {
  let myPix = ['dreamscape.jpg', 'dreamscape2.jpg', 'dreamscape3.jpg'];
  let randomNumber = Math.floor(Math.random() * myPix.length);
  document.querySelector('#container_all').style.backgroundImage = `url('assets/${myPix[randomNumber]}')`;
  console.log(container.style.backgroundImage);
}