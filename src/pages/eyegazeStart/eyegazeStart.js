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
  effort: "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study.",
  default: "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study."

}
// var showCompensation = Math.floor(Math.random() * 2);
// var key = String(Object.keys(conditions)[showCompensation]); 
// var msg = conditions[localStorage['group']];
// localStorage.setItem("group", key);
// var displayedMessage = msg;

function EyegazeStartContainer() {
  console.log(localStorage['group'])
  console.log('-----------')
  let msg = conditions[localStorage['group']];
  let displayedMessage = msg

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
        <div style={{ fontSize: "25px", width: "75%", margin: "auto" }}>
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
