import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox } from "antd";
import "./instructions.css";
let messages = ["Thank you for participating. You will be paid a base rate of 2.0 dollars for successfully completing the study, and 0.2 dollars additionally for each image caption that you make better.", 
                "Thank you for participating. You will be paid 5.0 dollars for succesfully completing the study."]
let group_names = ["effort", "default"]
var showCompensation = Math.floor(Math.random() * 2)
localStorage.setItem('group', group_names[showCompensation]);
var displayedMessage = messages[showCompensation]

function InstructionsContainer() {
  const [agree, setAgree] = useState(false);
  const [acceptFirst, setAcceptFirst] = useState(false);

  console.log(showCompensation)

  
  //   const [task, setTask] = useState(0);

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const continueChange = () =>{ 
    setAcceptFirst(true);
   }  

  const routeChange = () => {
    let path = "/#/EyeGazeStart";
    window.location.assign(path);
    console.log('opening popup')
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
      fetch('http://0.0.0.0:8080/setup')
      .then(response => response.json())
      .then(data => {
          console.log(data)
          // setTask(data['agent_number']);
          // send user id as well
          localStorage.setItem('user-id', data['user_id']);
      });
  }, []);

  return (
    <div className="container">
      <h1>Study Instructions</h1>

      {!acceptFirst ?
      <> 

      <div style={{fontSize: "20px", textAlign: "left", width:"75%", marginLeft: "10%"}}>
        Image captioning is the process of describing the content of an image in words. 
        
        <b>Your task</b> today is to describe the <b>information an image conveys</b> and the <b>visual details</b> that may be important to visually impaired audiences. 

        You wil collaborate with an AI assistant that generates captions automatically to provide the best quality captions (include key information and use good language). 

        The images you will see mostly involve human actions in different contexts.  

        Read the following instructions to complete the study:
        <ol>
          <li> You will be shown 15 images in total. </li>
          <li> For each image, you will be presented the <b>original caption</b> generated by an  <b>AI model</b>. </li>
          <li> Make the corresponding changes that will <b>improve the quality</b> of the caption. You can make <b>type</b> or <b>delete</b> edits at the <b>character level at any location in the caption</b>. You will also see the initial caption with the tracked changes you have made. </li>
          <li> There are <b>Undo</b> and <b>Reset</b> buttons that you can use as you modify the captions. </li>
          <li> Once you are satisfied with your final caption version, continue to the next image. Your caption will be saved.</li>
          <li> You can click to go back to the previous image only if you want to make any further change. </li>
          <li> Repeat this process with all the images and then complete a final survey.</li>
        </ol>

        <p>NOTE: As you write the captions, <b>DO NOT</b> speculate about what people in the image might be saying or thinking, or events that might have happened in the past or future.
        </p>
        <Checkbox
          onChange={checkboxHandler}
          style={{ fontSize: "20px", textAlign: "left", alignSelf: "stretch" }}
        >
          I read and understand the conditions. 
        </Checkbox>
      </div>

      <Button disabled={!agree} variant="btn btn-success" onClick={continueChange} style={{marginTop: "10px", marginBottom: "10px"}}>
            Continue
      </Button>
      </>
      : 
      <>

      <div style={{fontSize: "23px", width: "75%", margin: "auto"}}>
        {displayedMessage}
      </div>
      <div> 
        <Button
          variant="btn btn-success"
          onClick={routeChange}
          style={{marginTop: "30px"}}
        >
          Start
        </Button>
      </div>
      </>
      }
    </div>
  );
}

export default InstructionsContainer;
