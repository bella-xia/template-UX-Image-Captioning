import { Button, Radio } from "antd";
import React, { useState } from "react";
import "./eyegazeStart.css";

const messages = [
  "Thank you for participating. You will be paid $ 3.0 dollars for the next six images you evaluate.",
  "Thank you for participating. You will be paid $ 6.0 dollars for successfully completing the study.",
];

const group_names = ["effort", "default"];

const EyegazeStartContainer = () => {
  const [selectedD, setSelectedD] = useState(null);
  const [selectedE, setSelectedE] = useState(null);
  const [recording, setRecording] = useState(false);
  const numResults = 16; // Set the desired number of options for default and effort

  const recordChange = () => {
    if (selectedD && selectedE) {
      setRecording(true);
    } else {
      // Handle case when the user has not selected both D and E options
      alert("Please select one D option and one E option.");
    }
  };

  const handleDChange = (e) => {
    setSelectedD(e.target.value);
  };

  const handleEChange = (e) => {
    setSelectedE(e.target.value);
  };

  const routeChange = () => {
    localStorage.setItem("start_eye", Date.now());
    let path = "/#/Accuracy";
    window.location.assign(path);
  };

  const generateOptions = (prefix) => {
    const options = [];
    for (let i = 1; i <= numResults; i++) {
      options.push(`${prefix}${i}`);
    }
    return options;
  };

  return (
    <div className="container">
      {!recording ? (
        <>
          <div className="title">
            <h1> We will start now. Please select one D and one E value. </h1>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            ></div>
            {/* Column D */}
            <div>
              <Radio.Group onChange={handleDChange} value={selectedD}>
                {generateOptions("d").map((option) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            {/* Column E (positioned under D) */}
            <div>
              <Radio.Group onChange={handleEChange} value={selectedE}>
                {generateOptions("e").map((option) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <Button onClick={routeChange}> Next </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EyegazeStartContainer;
