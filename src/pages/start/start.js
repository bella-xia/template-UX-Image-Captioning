import React, { Component,useState } from "react";
import {Button, Modal} from 'antd'
// import { useHistory} from "react-router";

import "./start.css";

function StartContainer() {
    // let history = useHistory();
    const [agree, setAgree] = useState(false);
    localStorage.setItem('backend_path', 'https://backend-7lis24xilq-ue.a.run.app')


    const checkboxHandler = () => {
      setAgree(!agree);
    }
  
    const routeChange = () =>{ 
      fetch(localStorage['backend_path'].concat('/checkusers')) // http://127.0.0.1:8080/checkusers
      .then(response => response.json())
      .then(message => {
          console.log(message)
          if (message['warning']===true){
            // not needed here
            localStorage.setItem('block_user', true)
            localStorage.setItem('finished', true);
            let path = "/#/EndEval"
            window.location.assign(path)
          } else {
            localStorage.setItem('study_time', Date.now())
            let path = '/#/Check'; 
            // history.push(path);
            window.location.assign(path);
            console.log('moving to instructions page')
          }

          
      });
    }

    return (
      <div className="Home">
        <div className="lander">
            <h1>Image Captioning with AI Assistance</h1>
            <p> You are being asked to participate in an online study for a research project at Johns Hopkins University. Participation in this study is voluntary. Even if you decide to join now, you can change your mind later. If you want to stop your participation in the study, you can simply close the browser. The records and data from the study will only be reviewed by team members involved in the project. We will not ask for information that identifies you, thus, your responses cannot be associated with your identity. This study has been approved by the Homewood IRB. You can read a more detailed informed consent in the following <a href="https://drive.google.com/file/d/1lWB-uF4qzrPyFYWHvazfx1zHyrXJOVl8/view?usp=sharing" target="_blank">link</a>. 
            By clicking "Continue", you accept these conditions and agree to participate in the study.
            </p>

            <div>
                <input type="checkbox" id="agree" onChange={checkboxHandler} />
                <label htmlFor="agree"> I agree to the <b>terms and conditions</b></label>
            </div>

            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                Continue
            </Button>
        </div>
      </div>
      );
}

export default StartContainer;