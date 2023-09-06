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
  const [captionDict, setCaptionDict] = useState([]);
  const [prevCaption, setPrevCaption] = useState("");
  // const [currentTime, setCurrentTime] = useState(0);
  const [moveToSurvey, setMoveToSurvey] = useState(false);
  const [render, setRender] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  const setOriginalCaptionDict = (caption) => {
    const data = [];
    for (let i = 0; i < caption.length; i++) {
      const letter = caption[i];

      // Create a data object for the letter
      const dataObject = {
        idx: i, // Index of the letter
        letter: letter, // The actual letter
        state: "original", // manage the state of the object
      };

      // Push the data object to the data array
      data.push(dataObject);
    }
    setCaptionDict(() => data);
  };

  const setChangedCaptionDict = (editedCaption) => {
    const originalDict = captionDict;
    const nonDeleteDict = captionDict.filter((item) => item.state !== "delete");
    const insert = nonDeleteDict.length < editedCaption.length ? true : false;
    const data = [];
    let idx = 0;
    let editedIdx = 0;
    let hasInserted = false;
    for (let i = 0; i < originalDict.length; i++) {
      let dictItem = originalDict[i];
      console.log(dictItem);
      console.log(editedCaption[idx]);
      if (
        dictItem.state === "delete" ||
        dictItem.letter === editedCaption[idx]
      ) {
        console.log("not changed");
        if (editedIdx === i) {
          data.push(dictItem);
        } else {
          const dataObject = {
            idx: editedIdx, // Index of the letter
            letter: dictItem.letter, // The actual letter
            state: dictItem.state, // manage the state of the object
          };
          data.push(dataObject);
        }
        editedIdx++;
        idx = dictItem.state === "delete" ? idx : idx + 1;
      } else if (insert) {
        console.log("insert");
        hasInserted = true;
        const dataObject = {
          idx: editedIdx, // Index of the letter
          letter: editedCaption[idx], // The actual letter
          state: "insert", // manage the state of the object
        };
        data.push(dataObject);
        editedIdx++;
        i--;
        idx++;
      } else {
        console.log("delete");
        const dataObject = {
          idx: editedIdx, // Index of the letter
          letter: dictItem.letter, // The actual letter
          state: "delete", // manage the state of the object
        };
        data.push(dataObject);
        editedIdx++;
      }
      if (insert && i === originalDict.length - 1 && !hasInserted) {
        const dataObject = {
          idx: editedIdx,
          letter: editedCaption[idx], // The actual letter
          state: "insert",
        };
        data.push(dataObject);
        editedIdx++;
      }
    }
    setCaptionDict(data);
    console.log(data);
  };

  const getPassageComponent = () => {
    return (
      <div className="caption-div">
        {captionDict.map((dictItem) => (
          <span className={dictItem.state} key={dictItem.idx}>
            {dictItem.letter}
          </span>
        ))}
      </div>
    );
  };

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
    setOriginalCaptionDict(captions[count]);
    // setCaptionDict(() => [
    //   {
    //     idx: 0,
    //     text: captions[count].substring(0, captions[count].length),
    //     type: "original",
    //   },
    // ]);
    setTaskTime(Date.now());
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

  const saveEditButtonClick = () => {
    // save
    if (editMode) {
      setOriginalCaptionDict(captions[imageCount]);
    } else {
      // edit
      setPrevCaption(captions[imageCount]);
    }
    setEditMode((e) => !e);
  };

  const undoClearButtonClick = () => {
    if (editMode) {
      // undo
      setCaptions(
        captions.map((caption, idx) =>
          idx === imageCount ? prevCaption : caption
        )
      );
      setOriginalCaptionDict(prevCaption);
    } else {
      // clear
      setPrevCaption(captions[imageCount]);
      const data = [];
      for (let i = 0; i < captionDict.length; i++) {
        const dictObj = {
          idx: captionDict[i].idx, // Index of the letter
          letter: captionDict[i].letter, // The actual letter
          state: "delete", // manage the state of the object
        };
        data.push(dictObj);
      }
      setCaptionDict(() => data);
      setCaptions(
        captions.map((caption, idx) => (idx === imageCount ? "" : caption))
      );
    }
    setEditMode((e) => !e);
  };

  const returnOriginalText = () => {
    setPrevCaption(captions[imageCount]);
    setCaptions(
      captions.map((caption, idx) =>
        idx === imageCount ? originalCaptions[imageCount] : caption
      )
    );
    setOriginalCaptionDict(originalCaptions[imageCount]);
  };

  const modifyCaption = (modCap) => {
    setChangedCaptionDict(modCap.target.value);
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
    setOriginalCaptionDict(captions[imageCount]);
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
                <p className="t"> Edit AI-Generated Caption: </p>
              </div>
              <div className="caption-edits">
                <input
                  className="caption"
                  value={captions[imageCount]}
                  onChange={modifyCaption}
                  readOnly={!editMode}
                ></input>
                <div className="edit-buttons">
                  <button onClick={undoClearButtonClick} className="undo-clear">
                    {editMode ? "Undo" : "Clear"}
                  </button>
                  <button onClick={saveEditButtonClick} className="save-edit">
                    {editMode ? "Save" : "Edit"}
                  </button>
                </div>
                <div>
                  <button
                    onClick={returnOriginalText}
                    className="return-original"
                  >
                    Return Original Caption
                  </button>
                </div>
                <div>
                  <p className="t"> Tracing Changes: </p>
                </div>
                <>{getPassageComponent()}</>
              </div>
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
                  <div className="popup-buttons">
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
