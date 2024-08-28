import React, { Component, useState } from "react";
import { Button, Modal } from "antd";
// import { useHistory} from "react-router";

import "./styling.css";

function AnnotateStartContainer() {
  // let history = useHistory();
  const [agree, setAgree] = useState(false);
  localStorage.setItem('backend_path', 'http://127.0.0.1:8080')
  // http://127.0.0.1:8080
  // https://backend-7lis24xilq-ue.a.run.app

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const routeChange = () => {
    fetch(localStorage['backend_path'].concat('/setup')) 
    .then(response => response.json())
    .then(data => {
        console.log(data)    
        localStorage.setItem("user-id", data["user_id"]);
    });
    let path = "/#Identify";
    // history.push(path);
    window.location.assign(path);
  };

  return (
    <div className="Home">
      <div className="lander">
        <h1>Caption Quality Assessment </h1>

        <p>You are being asked to participate in an online evaluation for a research project at Johns Hopkins University. Participation in this study is voluntary. Even if you decide to join now, you can change your mind later. If you want to stop your participation in the study, you can simply close the browser. The records and data from the study will only be reviewed by team members involved in the project. We will not ask for information that identifies you, thus, your responses cannot be associated with your identity. This study has been approved by the Homewood IRB.
        By clicking "Continue", you accept these conditions and agree to participate in the study.
        </p>



        <Button variant="btn btn-success" onClick={routeChange}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default AnnotateStartContainer;