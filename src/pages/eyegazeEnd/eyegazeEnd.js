import { Button } from "antd";
import React, { Component,useState } from "react";
import './eyegazeEnd.css'

function eyegazeEndContainer() {

  const routeChange = () => {
    let path = "/#/Survey";
    window.location.assign(path);
  };

    return (
      <div className="container">
        <div className="title">
        <h1> We will stop recording eyegaze data now. </h1>
        <Button onClick={routeChange}> Continue </Button>
      </div>
      </div>
      );
}

export default eyegazeEndContainer;