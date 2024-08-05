import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox } from "antd";
import "./instructions.css";
let messages = [
  "You have earned $ 6.0 dollars so far. For the remaining images, failing to create better captions will result in deductions from your current compensation of $6.0. Each caption that is not improved will lead to a subtraction from your earnings.",
  "You have completed half of the images. You have six images left.",
];

function InterventionContainer() {
  const [agree, setAgree] = useState(false);
  const [display, setDisplay] = useState(false);
  const [acceptFirst, setAcceptFirst] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");

  console.log(displayedMessage);

  const routeChange = () => {
    let path = "/#/Main2";
    //localStorage.setItem("imageCount", imageCount); // Store the current image count
    //localStorage.setItem("imagePaths", JSON.stringify(img_paths[0])); // Store the list of image paths
    //console.log(img_paths);

    const retrievedList = JSON.parse(localStorage.getItem("img_paths"));
    console.log(retrievedList);
    window.location.assign(path);
  };

  useEffect(() => {
    let showCompensation = localStorage["group"];
    let group_names = ["effort", "default"];
    let index = group_names.indexOf(showCompensation);
    setDisplayedMessage(messages[index]);
  }, []);

  return (
    <div className="container">
      <h1>Announcement</h1>

      <div style={{ fontSize: "25px", width: "75%", margin: "auto" }}>
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
    </div>
  );
}

export default InterventionContainer;
