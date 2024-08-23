import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row } from "antd";
import "antd/dist/antd.css";
import "./styling.css";
import { TextField } from "@mui/material";

function AnnotateContainer() {
  //const history = useHistory();
  const [sliderInteracted, setSliderInteracted] = useState({
    accuracy: false,
    detail: false,
  });
  const [surveyData, setSurveyData] = useState([]);
  const [selectedColumnsA, setSelectedColumnsA] = useState({
    1: null,
    2: null,
    3: null,
  });
  const [sliderValues, setSliderValues] = useState({
    accuracy: -1,
    detail: -1,
  });
  const [sliderTimes, setSliderTimes] = useState({
    accuracy: 0,
    detail: 0,
  });
  const [currentCaption, setCurrentCaption] = useState(""); // Caption for current image

  const [columnDisabledA, setColumnDisabledA] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [selectedColumnsD, setSelectedColumnsD] = useState({
    1: null,
    2: null,
    3: null,
  });

  const [columnDisabledD, setColumnDisabledD] = useState({
    1: false,
    2: false,
    3: false,
  });
  var showLastImage = localStorage.getItem("lastImage");
  const [firstEditBool, setFirstEditBool] = useState(true);
  // timer for when the image is presented
  const [startImageTime, setStartImageTime] = useState(Date.now());
  // timer for when users move to the next image
  const [deltaImageTime, setDeltaImageTime] = useState(0);
  // The time when we first edit the caption
  const [startEditTime, setStartEditTime] = useState(Date.now());
  // The time when we last edit the caption
  const [deltaEditTime, setDeltaEditTime] = useState(0);
  const [edited, setEdited] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [imagePath, setImagePath] = useState("");
  localStorage.setItem("currentImageCount", imageCount);
  const [finishCounter, setFinishCounter] = useState(0);
  // time variables using date.now
  const [taskTime, setTaskTime] = useState(Date.now());
  const [editTime, setEditTime] = useState(Date.now());
  const [taskUseTime, setTaskUseTime] = useState(
    Array.from({ length: 12 }, (_, i) => 0)
  );
  const [showPopup, setShowPopup] = useState(false);

  const [showPrevCaption, setShowPrevCaption] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [captionDict, setCaptionDict] = useState([]);
  const [captionsList, setCaptionsList] = useState([]);
  const [captionsGroups, setCaptionsGroups] = useState([]);

  const shuffle_idx = useState(
    [0, 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 14].sort(() => Math.random() - 0.5)
  );
  const isMounted = useRef(true);
  const [captions, setCaptions] = useState([]); // useState(shuffle_idx[0].map(i => allCaptions[i]));
  const [prevCaption, setPrevCaption] = useState("");
  const [editData, setData] = useState([]);
  const [editDataPrev, setDataPrev] = useState([]);
  const [editDataNow, setDataNow] = useState([]);
  const [moveToSurvey, setMoveToSurvey] = useState(false);
  const [moveToLastImage, setMoveToLastImage] = useState(true);
  const [render, setRender] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [editPrevTime, setEditPrevTime] = useState(Date.now());
  const [maxChange, setMaxChange] = useState(-1);
  const [originalCaptions, setOriginalCaptions] = useState([]); // shuffle_idx[0].map(i => allCaptions[i]));
  //console.log(originalCaptions)
  const [defaultCaption, setDefaultCaption] = useState("");
  const [effortCaption, setEffortCaption] = useState("");
  const [originalCaption, setOriginalCaption] = useState("");
  const [captionsInfo, setCaptionsInfo] = useState("");
  const [captionTag, setCaptionTag] = useState("");
  const [captionGroup, setCaptionGroup] = useState("");
  const [currACaption, setCurrACaption] = useState([]);
  const [currBCaption, setCurrBCaption] = useState([]);
  const [currCCaption, setCurrCCaption] = useState([]);
  const [imageCountBackend, setImageCountBackend] = useState(0);

  const [questions, setQuestions] = useState([]);

  const allQuestions = [
    {
      id: "accuracy",
      text: "Rate how accurate is the caption, considering whether the caption is related to the target image without distortion.",
      labels: ["Very inaccurate", "Inaccurate", "Accurate", "Very accurate"],
    },
    {
      id: "detail",
      text: "Rate how detailed is the caption, considering how much image gist (major event in the image) the captions conveys.",
      labels: ["Very poor detail", "Poor detail", "Good detail", "Very good detail"],
    },
  ];

  useEffect(() => {
    // Randomize question order
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, [imageCount]);



  const renderRadioButtons = (
    rowNumber,
    selectedColumns,
    setColumns,
    setIdentifier
  ) => {
    const handleInputChange = (columnNumber) => {
      handleRadioChange(
        rowNumber,
        columnNumber,
        selectedColumns,
        setColumns,
        setIdentifier
      );
    };

    return [1].map((columnNumber) => (
      <td
        key={columnNumber}
        style={{ marginRight: "10px", textAlign: "center" }}
      >
        <input
          type="radio"
          name={`radio${setIdentifier}Row${rowNumber}`}
          value={columnNumber}
          onChange={() => handleInputChange(columnNumber)}
          className="custom-radio"
        />
      </td>
    ));
  };

  //console.log(showLastImage)
  const updateAnnotationData = (rowData) => {
    const newData = [...surveyData];
    newData.push(rowData);
    setSurveyData(newData);
  };
  // 127.0.0.1
  const sendAnnotationData = (obj) => {
    fetch(localStorage['backend_path'].concat("/annotationData"), {
      method: "POST",
      body: JSON.stringify({
        comb: localStorage.getItem("combination"),
        userID: localStorage["user-id"],
        folder: localStorage["eval_folder"],
        content: obj,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error("Error saving survey data:", error);
      });
  };
  const setChangedCaptionDict = (editedCaption, remain_order) => {
    const originalDict = captionDict;
    const order = remain_order ? maxChange : maxChange + 1;
    let madeChanges = true;
    const nonDeleteDict = captionDict.filter((item) => item.state !== "delete");
    const insert = nonDeleteDict.length < editedCaption.length ? true : false;
    const data = [];
    let idx = 0;
    let editedIdx = 0;
    let hasInserted = false;

    for (let i = 0; i < originalDict.length; i++) {
      let dictItem = originalDict[i];
      if (
        dictItem.state === "delete" ||
        dictItem.letter === editedCaption[idx]
      ) {
        if (editedIdx === i) {
          data.push(dictItem);
        } else {
          const dataObject = {
            idx: editedIdx, // Index of the letter
            letter: dictItem.letter, // The actual letter
            state: dictItem.state, // manage the state of the object
            order: dictItem.order,
          };
          data.push(dataObject);
        }
        editedIdx++;
        idx = dictItem.state === "delete" ? idx : idx + 1;
      } else if (insert) {
        hasInserted = true;
        const dataObject = {
          idx: editedIdx, // Index of the letter
          letter: editedCaption[idx], // The actual letter
          state: "insert", // manage the state of the object
          order: order,
        };
        data.push(dataObject);
        editedIdx++;
        i--;
        idx++;
      } else {
        if (dictItem.state !== "insert") {
          const dataObject = {
            idx: editedIdx, // Index of the letter
            letter: dictItem.letter, // The actual letter
            state: "delete", // manage the state of the object
            order: order,
          };
          data.push(dataObject);
          editedIdx++;
        } else {
          madeChanges = false;
        }
      }
      if (insert && i === originalDict.length - 1 && !hasInserted) {
        const dataObject = {
          idx: editedIdx,
          letter: editedCaption[idx], // The actual letter
          state: "insert",
          order: order,
        };
        data.push(dataObject);
        editedIdx++;
      }
    }
    if (!remain_order && madeChanges) {
      setMaxChange(() => order);
    }
    setCaptionDict(data);
    setData(data);
  };

  const getPassageComponent = () => {
    //Store the first and last edit in the database
    if (firstEditBool === true) {
      setFirstEditBool(false);
      console.log("first edit: ", captionDict);
      console.log("last edit: ", captionDict);
    } else {
      console.log("new last edit: ", captionDict);
    }

    if (showPrevCaption === true && editDataPrev !== []) {
      var currCaption = editDataPrev;
    } else if (showPrevCaption === false && editDataNow !== []) {
      var currCaption = editDataNow;
    } else {
      var currCaption = captions; //Todo: change
    }

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

  const handleRadioChange = (
    rowNumber,
    columnNumber,
    selectedColumns,
    setColumns
  ) => {
    // console.log(
    //   `Survey Selection: Row ${rowNumber}, Column ${columnNumber} (${label})`
    // );

    const isColumnAlreadySelected =
      Object.values(selectedColumns).includes(columnNumber);
    console.log(isColumnAlreadySelected);

    if (isColumnAlreadySelected) {
      alert(
        "Please select a different column. This column has already been chosen in another row."
      );
    }

    // Update selected columns state
    setColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [rowNumber]: columnNumber,
    }));
  };

  const baseImgUrl = "/image_folder/";
  const img_paths = useState(shuffle_idx[0].map((i) => `Image_${i + 1}.png`));
  //console.log(img_paths[imageCount][0]);
  localStorage.setItem("img_paths", JSON.stringify(img_paths));

  const routeChange = () => {
    let path = "/#/EndEval";
    window.location.assign(path);
  };

  const updateImage = (count) => {
    // restart variables
    setSliderValues({
      accuracy: -1,
      detail: -1,
    });

    setSliderTimes({
      accuracy: 0,
      detail: 0,
    });

    setSliderInteracted({ accuracy: false, detail: false });

    const usedTime = Date.now() - taskTime;

    //We can get the amount of time for each image
    console.log(count);
    console.log(usedTime);
    // TODO: ask what is this
    setTaskUseTime((l) =>
      l.map((time, idx) => (idx === imageCount ? usedTime : time))
    );

    if (count >= totalImages - 1) {
      setMoveToSurvey(true);
    }

    // restart variables
    setImageCount(count);
    setImagePath(img_paths[0][count]);
    console.log(imagePath);
    setCurrentImage(img_paths[0][count]);
    //setOriginalCaptionDict(captions[count]);
    setEdited(false);
    // restart counting the intial image time for the next case
    let currentTime = Date.now();
    let t_i_s = ((currentTime - localStorage["start_eye"]) / 1000).toFixed(3);
    setStartImageTime(t_i_s);
    setTaskTime(currentTime);
    setDeltaImageTime(0);
    setDeltaEditTime(0);
    setStartEditTime(0);
    console.log("image loading at second");
    console.log(t_i_s);
  };

  const nextChange = () => {
    // console.log(selectedColumns);
    if (!sliderInteracted.accuracy && !sliderInteracted.detail) {
      alert(
        "Please select one response for each slider before proceeding even if assigning very poor detail/inaccurate."
      );
      return; // Stop the function if sliders haven't been interacted with
    } else if (!sliderInteracted.accuracy) {
      alert(
        "Please select one response in the accuracy slider before proceeding even if assigning very inaccurate."
      );
      return; // Stop the function if sliders haven't been interacted with
    } else if (!sliderInteracted.detail) {
      alert(
        "Please select one response in the detail slider before proceeding even if assigning very poor detail."
      );
      return; // Stop the function if sliders haven't been interacted with
    }
    // measure image times here
    let t_i_f = ((Date.now() - taskTime) / 1000).toFixed(3);
    setDeltaImageTime(t_i_f);
    console.log("done with image after X seconds");
    console.log(t_i_f);
    const rowData = {
      image_name: currentImage,
      eval_caption: captionsList[0],
      accuracyLevel: sliderValues.accuracy,
      accuracyTime: sliderTimes.accuracy,
      detailLevel: sliderValues.detail,
      detailTime: sliderTimes.detail,
      caption_group: captionGroup,
      caption_tag: captionTag,
      image_time: t_i_f
    };
    console.log("getting ready to send data", rowData);
    console.log(selectedColumnsA);

    //updateAnnotationData(rowData);
    sendAnnotationData(rowData);

    // if they moved to the next image and did not edit at all the caption
    if (edited === false) {
      setStartEditTime(0);
      setDeltaEditTime(0);
    }

    const count = imageCount + 1;
    let data_send = {
      userID: localStorage["user-id"],
      startImageTime: startImageTime,
      deltaImageTime: t_i_f,
      startEditTime: startEditTime,
      deltaEditTime: deltaEditTime,
      image_name: currentImage,
      trial_number: imageCount + 1,
      edited_caption: captions[imageCount],
      original_caption: originalCaptions[imageCount],
    };

    // save data to backend
    //sendData(data_send);

    if (count < totalImages) {
      console.log(editData);
      // reinitialize variables
      setDataPrev(editData);
      setShowPrevCaption(false);
      updateImage(count);
    } else {
      alert(
        "If you click Next then you will be finishing scoring. Click on Next again if you are finished."
      );
      // line to stop activating the timeout
      localStorage.setItem('finished', true);
      routeChange();
    }
    //setEditMode(() => false);
    setMoveToLastImage(true);
  };

  const returnOriginalText = () => {
    console.log("changed caption!");
    if (edited === false) {
      alert("You have not made any changes to the current caption");
      // setEdited(true)
      // let currentTime = Date.now()
      // setEditTime(currentTime)
      // let t_i_e = ((currentTime - localStorage['start_eye'])/1000).toFixed(3);
      // setStartEditTime(t_i_e);
      // setDeltaEditTime(0);
    } else {
      console.log("updating last editing time");
      let t_i_d = ((Date.now() - editTime) / 1000).toFixed(3);
      setDeltaEditTime(t_i_d);
      console.log("Editing times");
      console.log(startEditTime, t_i_d);
    }
    console.log(originalCaptions);
    setPrevCaption(captions[0][imageCount]);
    setCaptions(
      captions.map((caption, idx) =>
        idx === imageCount ? originalCaptions[imageCount] : caption
      )
    );
    //setOriginalCaptionDict(originalCaptions[imageCount]);
    console.log(originalCaptions);
  };

  const revertCaption = () => {
    console.log("changed caption!");
    if (edited === false) {
      alert("You have not made any changes to the current caption");
      // setEdited(true)
      // let currentTime = Date.now()
      // setEditTime(currentTime)
      // let t_i_e = ((currentTime - localStorage['start_eye'])/1000).toFixed(3);
      // setStartEditTime(t_i_e);
      // setDeltaEditTime(0);
    } else {
      console.log("updating last editing time");
      let t_i_d = ((Date.now() - editTime) / 1000).toFixed(3);
      setDeltaEditTime(t_i_d);
      console.log(startEditTime, t_i_d);
    }

    const max_order = maxChange;
    if (max_order === -1) {
      console.log("no more changes");
      return;
    }
    const originalDict = captionDict;
    const data = [];
    let editedIdx = 0;
    for (let i = 0; i < originalDict.length; i++) {
      let dictItem = originalDict[i];
      if (dictItem.order === max_order) {
        // the one to revert
        if (dictItem.state === "delete") {
          const dataObject = {
            idx: editedIdx, // Index of the letter
            letter: dictItem.letter, // The actual letter
            state: "original", // manage the state of the object
            order: -1,
          };
          data.push(dataObject);
          editedIdx++;
        }
      } else {
        const dataObject = {
          idx: editedIdx, // Index of the letter
          letter: dictItem.letter, // The actual letter
          state: dictItem.state, // manage the state of the object
          order: dictItem.order,
        };
        data.push(dataObject);
        editedIdx++;
      }
    }
    setCaptionDict(data);
    setMaxChange(() => max_order - 1);
    setCaptionBasedOnDict(data);
    console.log(data);
  };

  const handleSliderChange = (name, value) => {
    console.log('calling slider change')
    setSliderValues((prev) => ({ ...prev, [name]: parseInt(value) }));
    setSliderInteracted((prev) => ({ ...prev, [name]: true }));

    // record after how many seconds the slider response was provided
    let t_i_f = ((Date.now() - taskTime) / 1000).toFixed(3);
    setSliderTimes((prev) => ({ ...prev, [name]: t_i_f }));
  };

  const handleSliderClick = (name, value) => {
    console.log('calling slider click')
    if (sliderValues[name] !== 0) { // Check if the value has never been set
      handleSliderChange(name, value);
    }
  };

  const modifyCaption = (modCap) => {
    console.log("changed caption!");
    if (edited === false) {
      setEdited(true);
      var d = new Date();
      let currentTime = Date.now();
      setEditTime(currentTime);
      let t_i_e = ((currentTime - localStorage["start_eye"]) / 1000).toFixed(3);
      setStartEditTime(t_i_e);
      setDeltaEditTime(0);
    } else {
      console.log("updating last editing time");
      let t_i_d = ((Date.now() - editTime) / 1000).toFixed(3);
      setDeltaEditTime(t_i_d);
      console.log("Editing times");
      console.log(startEditTime, t_i_d);
    }

    //console.log(modCap.target.value)
    const editCurrentTime = Date.now();
    if (editCurrentTime - editPrevTime < 1000) {
      setChangedCaptionDict(modCap.target.value, true);
    } else {
      setChangedCaptionDict(modCap.target.value, false);
      setEditPrevTime(() => editCurrentTime);
    }
    setCaptions(
      captions.map((caption, idx) =>
        idx === imageCount ? modCap.target.value : caption
      )
    );
  };

  const setCaptionBasedOnDict = (dict) => {
    let dictToString = "";
    for (let i = 0; i < dict.length; i++) {
      const dictItem = dict[i];
      if (dictItem.state !== "delete") {
        dictToString = dictToString + dictItem.letter;
      }
    }
    //console.log(dictToString);
    setCaptions(
      captions.map((caption, idx) =>
        idx === imageCount ? dictToString : caption
      )
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    e.preventDefault();
    return false;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const selection = window.getSelection().toString();
      if (selection) {
        e.preventDefault();
        return false;
      }
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your asynchronous operation
        const response = await fetch(localStorage['backend_path'].concat("/setEvals"));
        const data = await response.json();

        if (isMounted.current) {
          localStorage.setItem("user-id", data["user_id"]);
          localStorage.setItem("eval_folder", data["eval_folder"]);
          localStorage.setItem("combination", data["selected_combination"]);
          if (localStorage["combination"] ==='NA') {
            localStorage.setItem("block_user", true);
            console.log(localStorage["block_user"])
            console.log('blocking user...')
            let path = "/#/EndEval";
            window.location.assign(path);
          } else {
            localStorage.setItem("block_user", false)
          }
          // Update state with received data
          console.log("combination information");
          console.log(data.captions_info);
          setCaptionsInfo(data.captions_info);

          const imgPath = img_paths[0][imageCount];
          setImagePath(imgPath);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [imageCount, imagePath]);
  // initialize image
  useEffect(() => {
    //console.log("getting images");
    setTotalImages(img_paths[0].length);
    setCurrentImage(img_paths[0][imageCount]);
    let currentTime = Date.now();
    setTaskTime(currentTime);
    let t_i_s = ((currentTime - localStorage["start_eye"]) / 1000).toFixed(3);
    setStartImageTime(t_i_s);
    setRender(true);
    console.log("image loading at second");
    console.log(t_i_s);
  }, []);

  useEffect(() => {
    if (Array.isArray(captionsInfo)) {
      const allImageIds = captionsInfo.map(
        (captionInfo) => captionInfo.image_id
      );
      const imgIndex = allImageIds.findIndex(
        (imageId) => imageId === imagePath
      );
      if (imgIndex !== -1) {
        const currCaptionsAnnot = captionsInfo[imgIndex];
        const captionsList = [currCaptionsAnnot.caption];
        setCaptionsList(captionsList);
        setCaptionTag(currCaptionsAnnot.tag);
        setCaptionGroup(currCaptionsAnnot.group);
        console.log(captionsList);
        const groups = ["default", "edited"];
        setCaptionsGroups(groups);
      }
      setImageCountBackend(imgIndex);
    }
  }, [captionsInfo, imagePath]);

  const handleImageChange = (newImagePath) => {
    setCurrentImage(newImagePath); // Function to change the current image
  };

  return (
    <>
      {render ? (
        <div className="container">
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                width: "80%",
                marginLeft: "15%",
                textAlign: "left",
              }}
            >
              Consider the image and the caption below to answer the following
              questions.
            </div>

            <Row type="flex" justify="left">
              <Col span={11} type="flex">
                <img
                  src={baseImgUrl + currentImage}
                  alt={currentImage}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "5%",
                    marginLeft: "30%",
                  }}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginLeft: "50%",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  {imageCount + 1} / {totalImages} Images
                </p>
                <div>
                  <div className="box-container">
                    <div className="box">
                      <span className="caption-text">
                       
                        <b> Caption:</b>
                      </span>
                      <span className="caption-text">{captionsList[0]} </span>{" "}
                    </div>
                  </div>
                </div>
              </Col>

              <Col span={12} align="left">
                {/* Centering the survey-container */}
                {questions.map((question) => (
                  <div key={question.id} style={{ textAlign: "center", margin: "20px 0" }}>
                        <div
                          style={{
                            marginTop: "20px",
                            width: "70%",
                            fontSize: "18px",
                            marginLeft: "20%",
                          }}
                        >
                          <b>{question.text}</b>
                        </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5px",
                        fontSize: "12px",
                        width: "80%",
                        margin: "0 auto",
                      }}
                    >
                      {question.labels.map((label, index) => (
                        <span key={index}>{label}</span>
                      ))}
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      value={sliderValues[question.id]}
                      onChange={(e) => handleSliderChange(question.id, e.target.value)}
                      onClick={(e) => handleSliderClick(question.id, e.target.value)}
                      style={{ width: "80%", margin: "0 auto" }}
                    />
                  </div>
                ))}
       
                <div className="back-buttons">
                  <button onClick={nextChange} className="undo-clear btn">
                    Next
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <>
          <h1> Loading ...</h1>
        </>
      )}
    </>
  );
}

export default AnnotateContainer;