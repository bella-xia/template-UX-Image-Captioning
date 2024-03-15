import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./main.css";
import { TextField } from "@mui/material";
import Papa from "papaparse";

function Main1Container() {
  //const history = useHistory();
  const [selectedColumns, setSelectedColumns] = useState({
    1: null,
    2: null,
    3: null,
  });

  const [columnDisabled, setColumnDisabled] = useState({
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
  const shuffle_idx = useState(
    [0, 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 14] //.sort(() => Math.random() - 0.5)
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
  const [shuffledIndices, setShuffledIndices] = useState([]);

  const renderRadioButtons = (rowNumber) => {
    const handleInputChange = (columnNumber) => {
      handleRadioChange(rowNumber, columnNumber);
    };

    return [1, 2, 3].map((columnNumber) => (
      <td key={columnNumber} style={{ marginRight: "10px" }}>
        <input
          type="radio"
          name={`radioRow${rowNumber}`}
          value={columnNumber}
          onChange={() => handleInputChange(columnNumber)}
          className="custom-radio"
        />
      </td>
    ));
  };

  //console.log(showLastImage)

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

  const handleRadioChange = (rowNumber, columnNumber, label) => {
    console.log(
      `Survey Selection: Row ${rowNumber}, Column ${columnNumber} (${label})`
    );

    const isColumnAlreadySelected =
      Object.values(selectedColumns).includes(columnNumber);
    console.log(isColumnAlreadySelected);

    if (isColumnAlreadySelected) {
      alert(
        "Please select a different column. This column has already been chosen in another row."
      );
    }

    // Update selected columns state
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [rowNumber]: columnNumber,
    }));
  };

  const baseImgUrl = "/image_folder/";
  const img_paths = useState(shuffle_idx[0].map((i) => `Image_${i + 1}.png`));
  //console.log(img_paths[imageCount][0]);
  localStorage.setItem("img_paths", JSON.stringify(img_paths));

  const routeChange = () => {
    let path = "/#/End";
    window.location.assign(path);
  };

  const updateImage = (count) => {
    setSelectedColumns({
      1: null,
      2: null,
      3: null,
    });
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });

    console.log("reset radio");
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
    setSelectedColumns({
      1: null,
      2: null,
      3: null,
    });
    // measure image times here
    let t_i_f = ((Date.now() - taskTime) / 1000).toFixed(3);
    setDeltaImageTime(t_i_f);
    console.log("done with image after X seconds");
    console.log(t_i_f);

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
      final_caption: captions[imageCount],
      original_caption: originalCaptions[imageCount],
    };

    // save data to backend
    sendData(data_send);

    if (count < totalImages) {
      console.log(editData);
      // reinitialize variables
      setDataPrev(editData);
      setShowPrevCaption(false);
      updateImage(count);
    } else {
      if (finishCounter === 1) {
        routeChange();
      } else {
        alert(
          "If you click Next then you will be finishing scoring. Click on Next again if you are finished."
        );
        setFinishCounter(1);
      }
    }

    setSelectedColumns({
      1: null,
      2: null,
      3: null,
    });

    setColumnDisabled({
      1: false,
      2: false,
      3: false,
    });

    //setEditMode(() => false);
    setMoveToLastImage(true);
  };

  const lastChange = () => {
    setSelectedColumns({
      1: null,
      2: null,
      3: null,
    });
    //if (moveToLastImage === true && showLastImage !== true) {
    // measure image times here
    let t_i_f = ((Date.now() - taskTime) / 1000).toFixed(3);
    setDeltaImageTime(t_i_f);
    console.log("done with image after X seconds");
    console.log(t_i_f);

    // if they moved to the next image and did not edit at all the caption
    if (edited === false) {
      console.log("caption not edited at all");
      setStartEditTime(0);
      setDeltaEditTime(0);
    }
    let data_send = {
      userID: localStorage["user-id"],
      startImageTime: startImageTime,
      deltaImageTime: t_i_f,
      startEditTime: startEditTime,
      deltaEditTime: deltaEditTime,
      image_name: currentImage,
      trial_number: imageCount + 1,
      final_caption: captions[imageCount],
      original_caption: originalCaptions[imageCount],
    };
    sendData(data_send);

    // TODO: record image time again?
    // let currentTime = Date.now()
    // setTaskTime(currentTime);
    console.log(editData);
    const count = imageCount - 1;
    // reinitialize variables
    if (count > -1) {
      if (count < totalImages - 1) {
        setMoveToSurvey(false);
      }
      updateImage(count);
      console.log("save curr");
      console.log(editData);
      setDataNow(editData);
      setShowPrevCaption(true);
    } else {
      count += 1;
    }
    //setEditMode(() => false);
    setMoveToLastImage(false);
    //} else {
    //alert("You can only go back once!");
    //}
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

  const sendData = (obj) => {
    fetch("http://127.0.0.1:8080/surveyData", {
      // This bit needs to be changed
      method: "POST",
      body: JSON.stringify({
        group: localStorage["group"],
        folder: "captions",
        content: obj,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
        // getLastestTodos();
      });
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
    // Shuffle captions when the component mounts or when image paths change
    const shuffleCaptions = () => {
      if (Array.isArray(captionsInfo)) {
        const shuffledIndicesList = captionsInfo.map(() => {
          const indicesList = [0, 1, 2];
          const shuffledList = [...indicesList].sort(() => Math.random() - 0.5);
          return shuffledList;
        });
        setShuffledIndices(shuffledIndicesList);
      }
    };

    shuffleCaptions(); // Initial shuffle

    // Clean up function
    return () => {
      // Clean up if necessary
    };
  }, [captionsInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your asynchronous operation
        const response = await fetch("http://127.0.0.1:8080/setup");
        const data = await response.json();

        if (isMounted.current) {
          // Update state with received data
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

  return (
    <>
      <h1>
        {" "}
        For your quality assessment, consider the correctness of the details
        contained in the captions and the amount of details provided. Rank the
        three captions in order of quality, with 1 being the lowest quality and
        3 being the highest quality. For your assessment, consider the
        correctness of the details contained in the captions and the amount of
        details provided
      </h1>
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
            <img
              src={baseImgUrl + currentImage}
              alt={currentImage}
              style={{ maxWidth: "100%", height: "auto" }}
            />

            {Array.isArray(captionsInfo) ? (
              captionsInfo.map((captionInfo, index) => {
                const allImageIds = captionsInfo.map(
                  (captionInfo) => captionInfo.image_id
                );

                // Find the index of the matching image_id in img_paths

                //console.log(captionsInfo);
                const imgIndex = allImageIds.findIndex((imageId) => {
                  return imageId === imagePath;
                });
                console.log("imgIndex:", imgIndex);

                // Check if the image_id is found in img_paths
                if (imgIndex !== -1) {
                  const curr_captions_annot = captionsInfo[imgIndex];
                  const captionsList = [
                    curr_captions_annot.default_caption,
                    curr_captions_annot.original_caption,
                    curr_captions_annot.effort_caption,
                  ];

                  //console.log("Before shuffle:", captionsList);

                  const shuffledCaptionsList = [...captionsList]; // Creating a copy of the original list
                  for (let i = shuffledCaptionsList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledCaptionsList[i], shuffledCaptionsList[j]] = [
                      shuffledCaptionsList[j],
                      shuffledCaptionsList[i],
                    ];
                  }

                  //console.log("Original Captions List:", captionsList);
                  //console.log("Shuffled Captions List:", shuffledCaptionsList);

                  if (index === 0) {
                    console.log("shuffled indicies", shuffledIndices[imgIndex]);
                    return (
                      <div key={index}>
                        <div className="box-container">
                          <div className="box">
                            <span className="caption-text">
                              {" "}
                              <b>Caption A:</b>
                            </span>{" "}
                            <span className="caption-text">
                              {captionsList[shuffledIndices[imgIndex][0]]}
                            </span>{" "}
                          </div>
                        </div>
                        <div className="box-container">
                          <div className="box">
                            <span className="caption-text">
                              {" "}
                              <b>Caption B:</b>
                            </span>{" "}
                            <span className="caption-text">
                              {captionsList[shuffledIndices[imgIndex][1]]}
                            </span>{" "}
                          </div>
                        </div>
                        <div className="box-container">
                          <div className="box">
                            <span className="caption-text">
                              {" "}
                              <b>Caption C:</b>
                            </span>{" "}
                            <span className="caption-text">
                              {captionsList[shuffledIndices[imgIndex][2]]}
                            </span>{" "}
                          </div>
                        </div>
                      </div>
                    );
                  }
                }

                return null;
              })
            ) : (
              <p>No captionsInfo available</p>
            )}
            {/* Centering the survey-container */}
            <div
              className="survey-container"
              style={{ margin: "auto", width: "fit-content" }}
            >
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {["Caption A ", "Caption B ", "Caption C"].map((label) => (
                      <th key={label}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Highest", "Intermediate", "Lowest"].map((label, index) => (
                    <tr key={index + 1}>
                      <td>{`${index + 1} (${label})`}</td>
                      {renderRadioButtons(index + 1)}
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={{ marginTop: "5px", fontSize: "18px" }}>
                {" "}
                {imageCount + 1} / {totalImages} Images
              </p>
            </div>

            <div className="back-buttons">
              <button onClick={lastChange} className="undo-clear btn">
                Back
              </button>
              <button onClick={nextChange} className="undo-clear btn">
                Next
              </button>
            </div>
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

export default Main1Container;
