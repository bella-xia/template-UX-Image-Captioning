import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox } from "antd";
import "./instructions.css";
let messages = ["Thank you for participating. You will be paid a base rate of 2.0 dollars for successfully completing the study, and 0.2 dollars additionally for each image caption that you make better.", 
                "Thank you for participating. You will be paid 5.0 dollars for succesfully completing the study."]
var showCompensation = Math.floor(Math.random() * 2)
var displayedMessage = messages[showCompensation]

function InstructionsContainer() {
  const [agree, setAgree] = useState(false);
  
  //   const [task, setTask] = useState(0);

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const routeChange = () => {
    let path = "/#/EyeGazeStart";
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
      <h1>Task Instructions</h1>

      <div className="text">
        Image captioning is the process of describing the context of an image in words. 
        
        Your task today is to collaborate with an AI assistant that generates captions automatically to provide the best quality captions. 
        
        The images you will see mostly involve human actions in different contexts.  

        Read the following instructions to complete the study:
        <ol>
          <li> You will be shown 15 images in total. </li>
          <li> For each image, you will be presented the original caption generated by an AI-model. </li>
          <li> Make the corresponding changes that will improve the quality of the caption. You will see the initial caption with the tracked changes you have made. </li>
          <li> Once you are satisfied with your final caption version, continue to the next image. </li>
          <li> You can click to go back to the previous image only if you want to make any further change. </li>
          <li> Repeat this process with all the images and then complete a final survey.</li>
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
