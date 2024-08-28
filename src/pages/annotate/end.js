import React, { Component, useState } from "react";
import "./styling.css";
import { Button, Form, Input, Radio, Checkbox } from "antd";

const formItemLayout = {
  labelCol: {
    span: 10,
    offset: 1,
  },
  wrapperCol: {
    span: 10,
    offset: 1,
  },
};

function AnnotateEndContainer() {
  const [submit, setSubmit] = useState(false);
  // var display = localStorage["block_user"];
  var display = localStorage.getItem("block_user") === "true";
  console.log(display)
  const [userid, setUserID] = useState(
    JSON.parse(localStorage.getItem("user-id")) || ""
  );

  const onFinish = (values) => {
    let data_send = {
      'userID': userid,
      'survey_data': values
    };
    sendData(data_send);
    setSubmit(true);
  };

  const sendData = (obj) => {
    // 127.0.0.1
    fetch(localStorage['backend_path'].concat('/emailData'), {
      method: 'POST',
      body: JSON.stringify({
        group: localStorage["eval_folder"], 
        folder: 'contact',
        content: obj
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(message => {
        console.log(message)
        // getLastestTodos();
      })
  } 


  return (
    <div className="container">
      <div className="title">
        {!display ? 
        <>
          <h2>Thank you for completing the caption quality assessment! </h2>


          <div className="text">
            <b>DO NOT</b> close this tab until you click on the link below.
          </div>

          <div className="text">
            Please click on the link below to be redirected to Prolific's website and finalize the study. 
          </div>

          <a href="https://app.prolific.com/submissions/complete?cc=C1GD2BCT" target="_blank" className="text">https://app.prolific.com/submissions/complete?cc=C1GD2BCT</a>


        </>
        : 
          <h2>Thank you for your interest. This form is not accepting responses anymore. </h2>
        
        }
      </div>
    </div>
  );
}

export default AnnotateEndContainer;