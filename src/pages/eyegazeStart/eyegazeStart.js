import { Button } from "antd";
import React, { Component, useState } from "react";
import "./eyegazeStart.css";

let messages = [
  "Thank you for participating. You will be paid $ 3.0 dollars for the next six images you evaluate.",
  "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study.",
];
let group_names = ["effort", "default"];
// new way to assign conditions
let conditions = {
  effort: "Thank you for participating. You will be paid $ 3.0 dollars for the next six images you evaluate.",
  default: "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study."

}
var showCompensation = Math.floor(Math.random() * 2);
var key = String(Object.keys(conditions)[showCompensation]); 
var msg = conditions[Object.keys(conditions)[showCompensation]];
localStorage.setItem("group", key);
var displayedMessage = msg;

function EyegazeStartContainer() {
  console.log(showCompensation)
  console.log(key)
  console.log(msg)
  console.log('-----------')

  const routeChange = () => {
    localStorage.setItem("start_eye", Date.now());
    let path = "/#/Main1";
    window.location.assign(path);
    // if (task % 2 === 0) {
    //     let path = '/#/Main2';
    //     window.location.assign(path);
    // } else {
    //     let path = '/#/Main1';
    //     window.location.assign(path);
    // }
  };

  return (
    <div className="container">
        <div style={{ fontSize: "23px", width: "75%", margin: "auto" }}>
          {displayedMessage}
        </div>

        <div>
          <Button variant="btn btn-success" onClick={routeChange}>
            Continue
          </Button>
        </div>
    </div>
  );
}

export default EyegazeStartContainer;
