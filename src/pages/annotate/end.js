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


  return (
    <div className="container">
      <div className="title">
        {!display ? 
          <h2>Thank you for completing the caption quality assessment! </h2>
        : 
          <h2>Thank you for your interest. This form is not accepting responses anymore. </h2>
        
        }
      </div>
    </div>
  );
}

export default AnnotateEndContainer;