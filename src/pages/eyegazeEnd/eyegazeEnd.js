import { Button, Checkbox } from "antd";
import React, { Component, useState, useEffect } from "react";
import "./eyegazeEnd.css";

function EyegazeEndContainer() {
  const [agree, setAgree] = useState(false);
  const routeChange = () => {
    let path = "/#/Demo";
    window.location.assign(path);
  };

  // Retrieve the user-id from localStorage
  const userId = localStorage.getItem("user-id");

  const checkboxHandler = () => {
    setAgree(!agree);
  };

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
      <Checkbox
        onChange={checkboxHandler}
        style={{ fontSize: "20px", textAlign: "left", alignSelf: "stretch" }}
      >
        I have completed the Google Form.
      </Checkbox>
    </div>
  );
}

export default EyegazeEndContainer;
