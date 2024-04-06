import { Button } from "antd";
import React from "react";
import "./eyegazeEnd.css";

function EyegazeEndContainer() {
  const routeChange = () => {
    let path = "/#/Survey";
    window.location.assign(path);
  };

  // Retrieve the user-id from localStorage
  const userId = localStorage.getItem("user-id");

  return (
    <div className="container">
      <div className="title">
        <h1>
          Please follow this Google Form and fill out questions about the
          images. Your user ID is {userId ? userId : "not set"}.
        </h1>
        <h1>
          <a
            href="https://forms.gle/FJn6d9hFXocNCN598"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://forms.gle/FJn6d9hFXocNCN598
          </a>
        </h1>
        <Button onClick={routeChange}>Continue</Button>
      </div>
    </div>
  );
}

export default EyegazeEndContainer;
