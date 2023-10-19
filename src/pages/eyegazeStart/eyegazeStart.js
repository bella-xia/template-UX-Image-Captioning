import { Button } from "antd";
import React, { Component,useState } from "react";
import './eyegazeStart.css'

function eyegazeStartContainer() {

  const routeChange = () => {
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
        <div className="title">
        <h1> We will start recording eyegaze data now. </h1>
        <Button onClick={routeChange}> Continue </Button>
      </div>
      </div>
      );
}

export default eyegazeStartContainer;