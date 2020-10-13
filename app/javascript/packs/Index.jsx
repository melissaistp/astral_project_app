import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import Friends from "../components/Friends";
import { Component } from 'react';

//Adds "App" component
document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});

function addHomepageBackground() {
  let myPix = ['dreamscape.jpg', 'dreamscape2.jpg', 'dreamscape3.jpg'];
  let randomNumber = Math.floor(Math.random() * myPix.length);
  if (document.querySelector('#container_all') != null) {
    document.querySelector('#container_all').style.backgroundImage = `url('/${myPix[randomNumber]}')`;
  }
}

function generateCode() {
  let astralCode = "";
  let symbols = ["ᐉ", "⤕", "⍄", "ᗑ", "↭", "☟", "☚", "⥁", "⥀", "▦", "⍐", "↫", "❦", "ღ", "ტ", "ℙ", "℘", "₰", "†",
                 "𝖂", "ǭ", "✪", "★", "✸", "⊛", "❃", "⨷", "❖", "♔", "♘", "♚"];
  for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * symbols.length);
    astralCode += symbols[randomNumber];
  }
  if (document.querySelector("#code") != null) {
    document.querySelector("#code").textContent = astralCode;
  }
}



function weatherBallon( cityName ) {
  const key = '4d5be969938cdc3a0ca1ab227cf80178';
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		drawWeather(data);
	})
	.catch(function() {
		// catch any errors
	});
}

function drawWeather( d ) {
  let description = d.weather[0].description; 

  let friendsBackground = document.querySelector("#container_allFriends");

  if( description.indexOf('rain') > 0 ) {
  	friendsBackground.classList.add('rainy');
  } else if( description.indexOf('cloud') > 0 ) {
    friendsBackground.classList.add('cloudy');
  } else if( description.indexOf('sunny') > 0 ) {
  	friendsBackground.classList.add('sunny');
  } else {
  	friendsBackground.classList.add('clear');
  }
}

window.onload = function () {
  //generates one of three backgrounds
  addHomepageBackground();

  //generates random astral plane code
  generateCode();

  //generates friends weather pattern background
  //weatherBallon( "London" );

}

