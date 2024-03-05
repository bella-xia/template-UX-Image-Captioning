import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox, Row, Col } from "antd";
import "./instructions.css";

function InstructionsContainer() {
  const [agree, setAgree] = useState(false);
  const [display, setDisplay] = useState(false);
  const [acceptFirst, setAcceptFirst] = useState(false);
  const [doneExample, setDoneExample] = useState(false);

  //   const [task, setTask] = useState(0);

  const routeChange = () => {
    let path = "/#/SelectionStart";
    // history.push(path);
    window.location.assign(path);
    console.log("moving to eye gaze start page");
  };

  const exampleChange = () => {
    let path = "/#/EyeGazeStart"; // change back
    window.location.assign(path);
    console.log("opening popup");
    // if (task % 2 === 0) {
    //     let path = '/#/Main2';
    //     window.location.assign(path);
    // } else {
    //     let path = '/#/Main1';
    //     window.location.assign(path);
    // }
  };

  // connect with the backend to get a user ID and randomize agent
  useEffect(() => {
    fetch("http://127.0.0.1:8080/setup")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setTask(data['agent_number']);
        // send user id as well
        localStorage.setItem("user-id", data["user_id"]);
      });
  }, []);

  return (
    <div className="container">
      <h1>Caption Quality Assessment Instructions</h1>

      <div
        style={{
          fontSize: "20px",
          textAlign: "left",
          width: "75%",
          marginLeft: "10%",
        }}
      >
        <p>
          Welcome to this evaluation exercise. In this task, you will be
          presented with 12 images and captions for each of two different
          evaluations. Your role is to rank these captions based on specific
          criteria provided for each set. It's important to approach this task
          with your first instinct. We value your initial perceptions and
          judgments, so please avoid overthinking your responses. Please select
          the evaluation indicated by the researcher.
        </p>
      </div>
      <Button variant="btn btn-success" onClick={routeChange}>
        Next
      </Button>
    </div>
  );
}

export default InstructionsContainer;
