import React, { Component, useState } from "react";
import "./end.css";
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

function EndContainer() {
  const [submit, setSubmit] = useState(false);
  const [userid, setUserID] = useState(
    JSON.parse(localStorage.getItem("user-id")) || ""
  );

  const onFinish = (values) => {
    let data_send = {
      userID: userid,
      survey_data: values,
    };
    sendData(data_send);
    setSubmit(true);
  };

  const sendData = (obj) => {
    fetch("http://127.0.0.1:8080/emailData", {
      method: "POST",
      body: JSON.stringify({
        group: localStorage["group"],
        folder: "emails",
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

  return (
    <div className="container">
      <div className="title">
        <h2>Thank you for completing the caption quality assessment! </h2>
      </div>
    </div>
  );
}

export default EndContainer;
