import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox, Row, Col } from "antd";
import "./instructions.css";


function InstructionsContainer() {
  const [agree, setAgree] = useState(false);
  const [display, setDisplay] = useState(false);
  const [acceptFirst, setAcceptFirst] = useState(false);
  const [doneExample, setDoneExample] = useState(false);

  
  //   const [task, setTask] = useState(0);

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const continueChange = () =>{ 
    setAcceptFirst(true);
   }  

  const displayChange =  () => {
    setDisplay(true);
  }

  const exampleChange = () => {
    let path = "/#/Start"; // change back
    window.location.assign(path);
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
      fetch('https://backend-7lis24xilq-ue.a.run.app/setup') //  http://127.0.0.1:8080/setup
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
        <p>
        <b>Image captioning</b> is the process of describing the content of an image in words. 

        The textual description of the image is then converted to speech, making images <b>more accessible</b> to visually impaired audiences. 

        We are looking for people to help us in the development of algorithms that enhance digital accessibility. 
        Human insights are essential for refining and improving such tools. 

        </p> 
        </div>

        {!display ? 
            <Button variant="btn btn-success" onClick={displayChange} style={{marginTop: "10px", marginBottom: "10px"}}>
                Read more
            </Button>

      : 
      <> 
        <div style={{fontSize: "20px", textAlign: "left", width:"75%", marginLeft: "10%"}}>

        <b>Your task</b> today is to describe the <b>information an image conveys</b> and the <b>visual details</b> that may be important to a person with visual impairments,  enabling them to build memories and experiences from the photographs they encounter. 

        You will collaborate with an Artificial Intelligence (AI) model that generates captions automatically to provide the best quality captions. 
 

        Read the following instructions to complete the study:
        <ol>
          <li> You will be shown 12 images in total. These images mostly involve human actions in different contexts. </li>
          <li> For each image, you will be presented the <b>original caption</b> generated by an  <b>AI model</b>. </li>
          <li> Make the corresponding changes that will <b>improve the quality</b> of the caption. You can make <b>type</b> or <b>delete edits</b> at the <b>character level at any location in the caption</b>. You will also see the initial caption with the tracked changes you have made. </li>
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
      }
      </>
      : 
      <>
      <div className="text"> Now, consider the following examples: </div>

      <Row type="flex" justify="center">
        <Col span={11} type="flex" align="middle" >
            <div className="text">
                <b>Better quality caption</b> 
            </div>
            <img src={'./image_folder/Image_30.png'} width="350" height="auto"/>
            <div className="text">
            <b>Initial caption:</b> A child in a blue shirt stands by a river, with an old town skyline in the distance
            </div>

            <div className="text">
            <b>Modified caption:</b> A young boy wearing a blue sleeveless shirt stands at the river's edge, poised to throw a stone. In the background, the silhouette of a cathedral with twin spires rises above the cityscape, with a bridge spanning the river to the right. The sky is partly cloud
            </div>
            <div className="text">
            <b>Why it was improved?</b> includes information about the action and the background. 
            </div>


        </Col>

        <Col span={11}>
            <div className="text">
                <b>Low quality caption</b>  
            </div>
            <img src={'./image_folder/Image_33.png'} width="350" height="auto"/>
            
            <div className="text">
            <b>Initial caption:</b> A group of children with helmets are seated on a small farm tractor in a backyard, preparing for a ride.
            </div>
            <div className="text">
            <b>Modified caption:</b> A group of four female children with helmets seated on a quad bike in a backyard, preparing for a ride. 
            </div>
            <div className="text">
            <b>Why is the quality still low?</b> misses context information, such as the mountains in the back, the fence, and details of the subjects, e.g., smiling, looking at the camera or away. 
            </div>
        </Col>
      </Row>

      <div> 
        <Button
          variant="btn btn-success"
          onClick={exampleChange}
        >
          Continue
        </Button>
      </div>
      </>
      }
    </div>
  );
}

export default InstructionsContainer;
