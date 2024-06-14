import { Button, Checkbox } from "antd";
import React, {  Component, useState, useEffect } from "react";
import "./eyegazeEnd.css";

function EyegazeEndContainer() {
  const [agree, setAgree] = useState(false);
  const [code, setCode] = useState('');
  const routeChange = () => {
    if (code === "password123"){
      let path = "/#/Demo";
      window.location.assign(path);
    } else {
      alert("The code doesn't match and you can't continue.");
    }

  };

  // Retrieve the user-id from localStorage
  const userId = localStorage.getItem("user-id");

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  return (
    <div className="formatting">
        <p>
        Please complete this Google Form with some questions about the images you visualized. 
        You will be asked to provide a user ID at the beginning of the form. 
        Copy and paste the following user ID: {userId ? userId : "not set"}
        </p>
        <p>
          Link: <a
            href="https://forms.gle/FJn6d9hFXocNCN598"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://forms.gle/FJn6d9hFXocNCN598
          </a>
        </p>

        <p> Keep this tab open. When you are done, copy the code given at the end of the survey and paste it in the box to continue: </p>
        <div>
          <input type="text" value={code} onInput={e => setCode(e.target.value)}/>
        </div>


      <div> 
        <Button onClick={routeChange}>Continue</Button>
      </div>
    </div>
  );
}

export default EyegazeEndContainer;
