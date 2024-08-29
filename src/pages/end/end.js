import React, { Component,useState } from "react";
import './end.css'
import { Button, Form, Input, Radio, Checkbox} from "antd";


const formItemLayout = {
  labelCol: {
      span: 10,
      offset:1,
  },
  wrapperCol: {
      span: 10,
      offset:1,
  },
};

function EndContainer() {
    const [submit, setSubmit] = useState(false);
    const [userid, setUserID] = useState(JSON.parse(localStorage.getItem("user-id")) || "");

    const totalTime = localStorage['total_time'] / 60;
    let alertMessage = "";


    if (totalTime > 45) {
      alertMessage = `Warning: It took you ${Math.round(totalTime)} minutes to complete the task, which is longer than expected. We will carefully review your submission to consider approval. If approved, you will still receive a compensation of $6 USD.`

    } else {
      alertMessage = `You have successfully completed the study and will receive a compensation of $6 USD. You completed the task in ${Math.round(totalTime)} minutes.`;
    }

    const onFinish = (values) => {
      let data_send = {
        'userID': userid,
        'survey_data': values
      };
      sendData(data_send);
      setSubmit(true);
    };

    const sendData = (obj) => {
      fetch('http://127.0.0.1:8080/emailData', {
        method: 'POST',
        body: JSON.stringify({
          group: localStorage['group'], 
          folder: 'emails',
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
        <h1>Thank you for completing the study! </h1>
      </div>

      <div className="text"> 
        {alertMessage}
      </div>

      <div className="text"> 
        <b>Debrief:</b> You may have been misled by the survey. We were investigating the influence of compensation strategies in your approach to the task. Regardless of the condition you were assigned to, your compensation was going to be $6 USD and independent of your performance. 
      </div>

      <div className="text">
      Please click on the link below to be redirected to Prolific's website before closing this tab and finalize the study. 
      </div>

      <a href="https://app.prolific.com/submissions/complete?cc=C11ET5GO" target="_blank" className="text">https://app.prolific.com/submissions/complete?cc=C11ET5GO </a>


      </div>
      );
}

export default EndContainer;