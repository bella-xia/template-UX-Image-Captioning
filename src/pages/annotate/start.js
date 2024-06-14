import React, { Component, useState } from "react";
import { Button, Modal } from "antd";
// import { useHistory} from "react-router";

import "./styling.css";

function AnnotateStartContainer() {
  // let history = useHistory();
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const routeChange = () => {
    let path = "/#InstrEval";
    // history.push(path);
    window.location.assign(path);
    console.log("moving to instructions page");
  };

  return (
    <div className="Home">
      <div className="lander">
        <h1>Caption Quality Assessment </h1>

        <Button variant="btn btn-success" onClick={routeChange}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default AnnotateStartContainer;