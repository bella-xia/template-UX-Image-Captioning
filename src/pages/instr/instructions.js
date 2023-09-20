import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox } from "antd";
import "./instructions.css";
let messages = ["Thank you for participating.", "Thank you for participating. You will be paid xx dollars."]
var showCompensation = Math.floor(Math.random() * 2)
var displayedMessage = messages[showCompensation]

function InstructionsContainer() {
  const [agree, setAgree] = useState(false);
  
  //   const [task, setTask] = useState(0);

  const checkboxHandler = () => {
    setAgree(!agree);
  };

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

  // connect with the backend to randomize the task
  //   useEffect(() => {
  //     fetch("http://localhost:8080/setup")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         console.log(data["task_number"]);
  //         setTask(data["task_number"]);
  //         // send user id as well
  //         localStorage.setItem("user-id", data["user_id"]);
  //         console.log(localStorage);
  //       });
  //   }, []);

  return (
    <div className="container">
      <h1>Page for instructions</h1>

      <div className="text">
        Read the following instructions to complete the study:
        <ol>
          <li> You will be shown 20 images. For each image, please edit the AI generated caption accordingly to best describe the human action of the image.</li>
          
        </ol>
        {displayedMessage}
      </div>

      <div className="text">
        <Checkbox
          onChange={checkboxHandler}
          style={{ fontSize: "20px", textAlign: "left", alignSelf: "stretch" }}
        >
          I read and understand the conditions. 
        </Checkbox>
      </div>

      <div className="text">
        <Button
          disabled={!agree}
          variant="btn btn-success"
          onClick={routeChange}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InstructionsContainer;
