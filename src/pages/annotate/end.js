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
          You qualify to participate in a raffle to win one of two $20 USD Amazon gift cards (one every 30 participants).
          </div>

          <div className="text">
          Please enter your contact details and click <b>Submit </b> (the personal information you enter here will not be associated with your responses in any way).
          </div>

          <div className="text">
            You can close this tab after clicking Submit.
          </div>

          <Form {...formItemLayout} layout='vertical'
            onFinish={onFinish}
            initialValues={{
            }}
          >

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Email"
            dependencies={['email']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your E-mail!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('email') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two emails that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>  

          <Form.Item >
            <Button type="primary" htmlType="submit" disabled={submit}>
              Submit
            </Button>
          </Form.Item>


          </Form>
        </>
        : 
          <h2>Thank you for your interest. This form is not accepting responses anymore. </h2>
        
        }
      </div>
    </div>
  );
}

export default AnnotateEndContainer;