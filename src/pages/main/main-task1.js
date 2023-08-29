import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./main.css";

function Main1Container() {
  const [currentImage, setCurrentImage] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [taskTime, setTaskTime] = useState(Date.now() + 1000 * 1000);
  const [taskUseTime, setTaskUseTime] = useState(
    Array.from({ length: 20 }, (_, i) => 0)
  );
  const [totalImages, setTotalImages] = useState(0);
  const [captions, setCaptions] = useState([
    "a group of horses standing around a fire",
    "a group of people standing  around a pool",
    "a man standing next to a tree by a lake",
    "a person in a kayak pad in the ocean",
    "a dog playing in the grass with its tongue",
    "a man walking down the street",
    "a woman standing in front of a car",
    "a man sitting on a bench",
    "a man standing on a small boat in a river",
    "a red toy truck",
    "a group of dogs playing in a fountain",
    "a person sitting on a dock watching the sunset",
    "a group of people sitting on a bench in a park",
    "a couple sitting on a bench",
    "a dog playing with a water hose in the yard",
    "a boy on a skateboard",
    "Two girls playing soccer",
    "a man parading in the water",
    "a cat laying in the grass",
    "a woman in a bikini on a surfboard",
  ]);
  // const [captionDict, setCaptionDict] = useState([]);
  // const [currentTime, setCurrentTime] = useState(0);
  const [moveToSurvey, setMoveToSurvey] = useState(false);
  const [render, setRender] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const originalCaptions = [
    "a group of horses standing around a fire",
    "a group of people standing  around a pool",
    "a man standing next to a tree by a lake",
    "a person in a kayak pad in the ocean",
    "a dog playing in the grass with its tongue",
    "a man walking down the street",
    "a woman standing in front of a car",
    "a man sitting on a bench",
    "a man standing on a small boat in a river",
    "a red toy truck",
    "a group of dogs playing in a fountain",
    "a person sitting on a dock watching the sunset",
    "a group of people sitting on a bench in a park",
    "a couple sitting on a bench",
    "a dog playing with a water hose in the yard",
    "a boy on a skateboard",
    "Two girls playing soccer",
    "a man parading in the water",
    "a cat laying in the grass",
    "a woman in a bikini on a surfboard",
  ];

  const baseImgUrl = "/image_folder/";
  const img_paths = Array.from({ length: 20 }, (_, i) => i).map(
    (idx) => `Image_${idx + 1}.png`
  );
  const routeChange = () => {
    let path = "/#/Survey";
    window.location.assign(path);
  };

  const updateImage = (count) => {
    const usedTime = Date.now() - taskTime;
    setTaskUseTime((l) =>
      l.map((time, idx) => (idx === imageCount ? usedTime : time))
    );
    if (count >= totalImages - 1) {
      setMoveToSurvey(true);
    }
    setImageCount(count);
    setCurrentImage(img_paths[count]);
    // setCaptionDict(() => [
    //   {
    //     idx: 0,
    //     text: captions[count].substring(0, captions[count].length),
    //     type: "original",
    //   },
    // ]);
    setTaskTime(Date.now());
    console.log(taskUseTime);
  };

  const nextChange = () => {
    // // if (choice < 1) {
    // //   alert("Please make sure to complete all the fields!");
    // // } else {
    //   // save data
    const count = imageCount + 1;
    //   let data = {
    //     q_id: currentImage,
    //     user_id: localStorage.getItem("user-id"),
    //     ans: choice,
    //     time: ((Date.now() - taskTime) / 1000).toFixed(3),
    //   };
    //   console.log(data);
    //   sendData(data);
    if (captions[imageCount] === originalCaptions[imageCount]) {
      setPopUp(() => true);
      return;
    }
    // reinitialize variables
    updateImage(count);
  };

  const popUpProceed = () => {
    setPopUp(!popUp);
    const count = imageCount + 1;
    if (count >= totalImages) {
      setMoveToSurvey(true);
    } else {
      // reinitialize variables
      updateImage(count);
    }
  };

  const Popup = (props) => {
    return (
      <div className="popup-box">
        <div className="box">{props.content}</div>
      </div>
    );
  };

  const modifyCaption = (modCap) => {
    // const newCaption = modCap.target.value;
    // const insert =
    //   newCaption.length > captions[imageCount].length ? true : false;
    // const dictLen = captionDict.length;
    // let j = 0;
    // for (let i = 0; i < dictLen; i++) {
    //   let foundElement = captionDict.find((item) => item.idx === i);
    //   if (foundElement.state === "delete") {
    //     continue;
    //   }
    //   if (newCaption.length < j + 1) {
    //     foundElement.state = "delete";

    //     setCaptionDict((dict) =>
    //       dict.map((item) => (item.idx === i ? foundElement : item))
    //     );
    //   }
    //   if (newCaption[j] !== foundElement.letter) {
    //     foundElement
    //   }
    // }
    setCaptions(
      captions.map((caption, idx) =>
        idx === imageCount ? modCap.target.value : caption
      )
    );
  };

  // testing communication with backend
  //   useEffect(() => {
  //     fetch("http://0.0.0.0:8080/time")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCurrentTime(data.time);
  //         console.log(data.time);
  //       });
  //   }, []);

  // initialize image
  useEffect(() => {
    console.log("getting images");
    setTotalImages(img_paths.length);
    setCurrentImage(img_paths[imageCount]);
    setTaskTime(Date.now());
    setRender(true);
    // const imageCaption = captions[imageCount];
    // const data = [];
    // for (let i = 0; i < imageCaption.length; i++) {
    //   const letter = imageCaption[i];

    //   // Create a data object for the letter
    //   const dataObject = {
    //     idx: i, // Index of the letter
    //     letter: letter, // The actual letter
    //     state: "original", // manage the state of the object
    //   };

    //   // Push the data object to the data array
    //   data.push(dataObject);
    // }
    // setCaptionDict(() => data);
    console.log();
  }, []);

  return (
    <>
      {render ? (
        <div className="container">
          <div className="task_name">Task Instructions: </div>
          <div className="task_descrip">
            Correct or accept the AI-generated caption for the fiven image. Make
            sure that the caption is specific and describes the human action.
          </div>
          <div className="column-container">
            <div className="left-column">
              <div className="image-frame">
                <img
                  className="image-inner"
                  src={baseImgUrl + currentImage}
                  alt={currentImage}
                />
              </div>
              <p>
                {" "}
                {imageCount + 1} / {totalImages} Images
              </p>
            </div>

            <div className="right-column">
              <div>
                <t> AI-generated Original Caption:</t>
              </div>
              <input
                class="caption"
                value={captions[imageCount]}
                onChange={modifyCaption}
              ></input>
              <div>
                <t> Final Caption:</t>
              </div>
              <input
                class="caption"
                value={captions[imageCount]}
                readOnly={true}
              ></input>
            </div>
          </div>

          <div className="button-container">
            <Button
              variant="btn btn-success"
              style={{ marginLeft: "70%" }}
              onClick={nextChange}
              disabled={moveToSurvey}
            >
              Next
            </Button>
          </div>

          {moveToSurvey && (
            <div className="button-container">
              <Button
                disabled={!moveToSurvey}
                variant="btn btn-success"
                onClick={routeChange}
              >
                Survey
              </Button>
            </div>
          )}
          {popUp && (
            <Popup
              content={
                <>
                  <b>Warning</b>
                  <p>
                    You have not made any edit on the AI-generated caption. Do
                    you want to go to the next image?
                  </p>
                  <div className="popbuttons">
                    <button className="cancel" onClick={() => setPopUp(!popUp)}>
                      Cancel
                    </button>
                    <button className="proceed" onClick={popUpProceed}>
                      Proceed
                    </button>
                  </div>
                </>
              }
            />
          )}
        </div>
      ) : (
        <>
          <h1> Loading ...</h1>
        </>
      )}
    </>
  );
}

export default Main1Container;
