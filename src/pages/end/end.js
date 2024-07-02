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
      fetch('https://backend-7lis24xilq-ue.a.run.app/emailData', {
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
        You have succesfully completed the study and will receive a compensation of $6 USD Amazon gift card. 
      </div>

      <div className="text">
      Please enter your contact details and click <b>Submit </b> (the personal information you enter here will not be associated with your responses in any way).
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

      </div>
      );
}

export default EndContainer;