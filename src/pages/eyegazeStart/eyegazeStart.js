import { Button } from "antd";
import React, { Component,useState } from "react";
import './eyegazeStart.css'

let messages = ["Thank you for participating. You will be paid $ 3.0 dollars for the next six images you evaluate.", 
                "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study."]
let group_names = ["effort", "default"]
var showCompensation = Math.floor(Math.random() * 2)
localStorage.setItem('group', group_names[showCompensation]);
var displayedMessage = messages[showCompensation]

function EyegazeStartContainer() {

  const [recording, setRecording] = useState(false);

  const recordChange = () => {
    setRecording(true);
  };

  const routeChange = () => {
    localStorage.setItem('start_eye', Date.now());
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

      {!recording ?
      <> 
        <div className="title">
          <h1> We will start recording eyegaze data now. </h1>

          <div style={{ fontSize: "20px", width: "75%", margin: "auto"}}>
             Communicate with the experimenter. 
          </div>

          <Button onClick={recordChange}> Start </Button>
        </div>
      </>
      : 
      <>  
          <h1>Announcement</h1>
          <div style={{fontSize: "23px", width: "75%", margin: "auto", margintop: "100px" }}>
            {displayedMessage}
          </div>

          <div> 
          <Button
            variant="btn btn-success"
            onClick={routeChange}
            style={{ marginTop: "30px" }}
          >
            Continue
          </Button>
          </div>
      </>
      }

      </div>
      );
}

export default EyegazeStartContainer;