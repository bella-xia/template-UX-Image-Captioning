import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox, Row, Col } from "antd";
import "./styling.css";

function AnnotateInstructionsContainer() {
  const [agree, setAgree] = useState(false);
  const [display, setDisplay] = useState(false);
  const [acceptFirst, setAcceptFirst] = useState(false);
  const [doneExample, setDoneExample] = useState(false);

  //   const [task, setTask] = useState(0);

  const routeChange = () => {
    let path = "/#/Eval";
    // history.push(path);
    window.location.assign(path);
    console.log("moving to main evaluation page");
  };

  const moreChange =  () => {
    setAcceptFirst(true);
  }

  // connect with the backend to get a user ID and randomize agent
  // useEffect(() => {
  //   fetch("http://127.0.0.1:8080/setup")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       // setTask(data['agent_number']);
  //       // send user id as well
  //       localStorage.setItem("user-id", data["user_id"]);
  //       localStorage.setItem("combination", data["selected_combination"]);
  //     });
  // }, []);

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
        {!acceptFirst ? 
        <>
        <p>
          
          Welcome to this evaluation exercise. In this task, you will be
          presented with 14 images and captions acquired in an initial study. 
          Your role is to rate these captions based on specific
          criteria provided for each set. 
          We ask you to read the captions and questions carefully, but it is important to approach this task with your first instinct. We value your initial perceptions and
          judgments, so please avoid overthinking your responses.  
        </p>

        <p> 
          <b>Do not</b> reload the website or try to go back since the data recording will be affected. 
          Please use <b>full screen</b> mode in <b>Chrome browser</b>.
        </p>

        <p> 
          You may need to wait for a few seconds for the first caption to load. Please do not start
          until the caption appears in the box. Allow for the images to load when you go to the next one.
        </p>

          <Button style={{ marginLeft: "40%" }} variant="btn btn-success" onClick={moreChange}>
            Read more 
          </Button>
        </>
        : 
        <>

          Before you start, let's consider some examples of captions with different levels of accuracy and details that contribute to the overall quality.

          <Row type="flex" justify="center">
        <Col span={11} type="flex" align="middle" >
            <img src={'./image_folder/Image_30.png'} width="400" height="auto"/>

        </Col>


        <Col span={10} align="left">
            <div className="text">
            <b>Poor quality:</b> A boy fishes by a river with a city skyline in the background. 
            </div>

            <div className="text">
            <b>Fair quality:</b> A child throws pebbles into a river on a sunny day, with a cathedral in the background. 
            </div>
            <div className="text">
            <b>Good quality:</b> A boy in a blue shirt is skimming stones at a riverbank with a historic cathedral and a bridge in the background on a sunny day.
            </div>

            <div className="text">
            <b>Very good quality:</b> A young boy wearing a blue sleeveless shirt stands at the river's edge, poised to throw a stone. In the background, the silhouette of a cathedral with twin spires rises above the cityscape, with a bridge spanning the river to the right under a soft blue sky.
            
            </div>

        </Col>
        </Row>

        <Button style={{ marginLeft: "60%" }} variant="btn btn-success" onClick={routeChange}>
            Start
        </Button>




        </>
        }
      </div>




    </div>
  );
}

export default AnnotateInstructionsContainer;