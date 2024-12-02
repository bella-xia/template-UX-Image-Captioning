import {Form, Button, Select, Radio} from "antd";
import React, { Component, useState } from "react";
import "./eyegazeStart.css";

let messages = [
  "Thank you for participating. You will be paid $ 3.0 dollars for the next six images you evaluate.",
  "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study.",
];

// new way to assign conditions
let conditions = {
  effort: "Thank you for participating. You will be paid $ 6.0 dollars for successfully completing the study. However, failing to create better captions will result in deductions from the compensation of $6.0. Each caption that is not improved will lead to a subtraction from your earnings.",
  default: "Thank you for participating. You will be paid $ 6.0 dollars for successfully completing the study."

}

const formItemLayout = {
  labelCol: {
      span: 24,
      offset:7
  },
  wrapperCol: {
      span:14,
      offset:7
  },
};


function EyegazeStartContainer() {
  console.log(localStorage.getItem('group'))
  console.log(localStorage.getItem('exp'))
  console.log(localStorage['user-id'])
  console.log('-----------')
  let msg = conditions[localStorage['exp']];
  let displayedMessage = msg;

  const [attempts, setAttempts] = useState(0); // Track the number of attempts
  const [error, setError] = useState(""); 
  const [clickFirst, setClickFirst] = useState(false);
  const [responseExp, setResponseExp] = useState("");

  const routeChange = () => {
    localStorage.setItem("start_eye", Date.now());
    let path = "/#/Main1";
    window.location.assign(path);
    // if (task % 2 === 0) {
    //     let path = '/#/Main2';
    //     window.location.assign(path);
    // } else {
    //     let path = '/#/Main1';
    //     window.location.assign(path);
    // }
  };

  const continueChange = () =>{ 
    setClickFirst(true);
    if (localStorage['exp'] === "effort") {
      setResponseExp('The $6.0 compensation could be reduced for not improving the AI-generated captions')
    }
      else if (localStorage['exp'] === "default") {
      setResponseExp('There is a $6.0 compensation for completing the study')
    }
  } 

  // NOTE: the question had to be changed for the other condition
  const onFinish = (values) => {
    if (values.check === '2') {
      // successfully responded comprehension check question
      // send to the backend the attempt
      sendData(attempts)
      localStorage.setItem("start_eye", Date.now());
      let path = "/#/Main1";
      window.location.assign(path);
    // complete and given them two chances to answer correctly
    } else {
      // incorrect answer
      if (attempts < 1){
        setAttempts(attempts + 1); // Increment attempts
        setError("Incorrect answer. Please try again.");
      } else {
        // terminate after two incorrect attempts
        sendData(attempts)
        localStorage.setItem('finished', true);
        alert("You have used all attempts. You cannot continue. Click the OK button.");
        let path = "/#/terminate"
        window.location.assign(path)
      }
    }

  }

  const sendData = (obj) => {
    fetch(localStorage['backend_path'].concat('/recordCheck'), {
      method: 'POST',
      body: JSON.stringify({
        userID: localStorage['user-id'], 
        group: localStorage['exp'], 
        attempts: obj,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(message => {
        console.log(message)
      })
  }



  return (
    <div className="container">
      {!clickFirst ?
      <>
        <div style={{ fontSize: "25px", width: "75%", margin: "50px auto" }}>
          {displayedMessage}
        </div>

        <div>
          <Button variant="btn btn-success" onClick={continueChange}>
            Continue
          </Button>
        </div>
      </>
      :
      <>
        <div style={{ fontSize: "25px", width: "75%", margin: "50px auto" }}>
          {displayedMessage}
        </div>

        <div style={{fontSize: "20px", margin: "auto", width: "60%"}}>
          Before beginning the study task, please respond this question to show that you comprehend the study you are about to complete. You will have two opportunities to get the answer correct.

        </div>
        <Form {...formItemLayout} layout='vertical'
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
        }}
        >

        <Form.Item 
            name ="check" 
            label= {
              <div style={{ textAlign: "center"}}>
                <p style={{fontSize: "18px", margin: "0 auto"}}>Which of the following statements is <b>true</b> about this study?</p>
              </div>
              }
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{display: "block", margin: "auto", textAlign: "left"}}>
                <div> 
                <Radio value="1"> <div style={{fontSize: "18px"}}>You will write captions entirely from scratch</div></Radio>
                </div>
                <div>
                <Radio  value="2"> <div style={{fontSize: "18px"}}>{responseExp}</div></Radio>
                </div>
                <div>
                <Radio value="3"> <div style={{fontSize: "18px"}}>If you fail to improve a caption the study is terminated immediately</div></Radio>
                </div>
            </Radio.Group>
        </Form.Item>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <div>
          <Form.Item >
          <Button type="primary" htmlType="submit" style={{marginLeft:"-30%"}}>
          Submit
          </Button>
          </Form.Item>
        </div>
        </Form>
        </>
        }
    </div>
  );
}

export default EyegazeStartContainer;
