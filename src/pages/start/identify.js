import { React, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
  // Radio,
  Input,
  Button,
  Radio,
} from "antd";
import "./start.css";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
      span: 22,
      offset:1
  },
  wrapperCol: {
      span:14,
      offset:1
  },
};

let conditions = {
    effort: "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study.",
    default: "Thank you for participating. You will be paid $ 6.0 dollars for succesfully completing the study."
  
  }
  var showCompensation = Math.floor(Math.random() * 2);
  var key = String(Object.keys(conditions)[showCompensation]); 
  var msg = conditions[Object.keys(conditions)[showCompensation]];
  localStorage.setItem("group", key);

const IDContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let copySaveArray = values;
    setAnswers(values);
    // save data
    let data_send = {
      'userID': localStorage['user-id'], 
      'id_value':values
    };
    sendData(data_send);
  };

  const sendData = (obj) => {
    fetch('http://127.0.0.1:8080/validateID', {
        // check that they haven't done it before
      method: 'POST',
      body: JSON.stringify({
        group: localStorage['group'], 
        folder: 'IDs',
        content: obj
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(message => {
        console.log(message)
        if (message['warning']===true){
            alert("Our records indicate that the provided Prolific ID has been used before. The study cannot be completed. Clic the OK button.")
            let path = "/#/terminate"
            window.location.assign(path)
          }  else {
            let path = "/#/Instructions";
            window.location.assign(path);
        }
      })
  }; 

    // connect with the backend to get a user ID and randomize agent  
    useEffect(() => {
        fetch('http://127.0.0.1:8080/setup')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // setTask(data['agent_number']);
            // send user id as well
            localStorage.setItem('user-id', data['user_id']);
        });
    }, []);

  return (
    <div className="container"> 
      <div className="title"> Let's get started</div>
      <Form {...formItemLayout} layout='vertical'
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
        }}
      >
        <Form.Item             
            name="id"
            label={
              <p style={{fontSize: "20px"}}> Before beginning the study, we need to get your Prolific ID to process your responses. You can copy it from your profile and paste it in the box.</p>}
            rules={[{
              required: true,
            },
          ]}
            style={{marginTop:"20px", fontSize:'20px'}}
        >
            <Input style={{ width: '30%', float:'left'}}/>
        </Form.Item>



         <Form.Item >
         
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};
export default IDContainer;
