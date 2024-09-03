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
    fetch(localStorage['backend_path'].concat('/validateID'), {
        // check that they haven't done it before
      method: 'POST',
      body: JSON.stringify({
        group: localStorage['exp'], 
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
            localStorage.setItem('finished', true);
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
        fetch(localStorage['backend_path'].concat('/setup')) // http://127.0.0.1:8080
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // setTask(data['agent_number']);
            // send user id as well
            localStorage.setItem('user-id', data['user_id']);
            let key = String(Object.keys(conditions)[data['group_idx']]); 
            console.log(key)
            localStorage.setItem("group", key);
            localStorage.setItem("exp", key);
            console.log(localStorage['group'])
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
            {
                pattern: /^[a-zA-Z0-9]{24}$/,
                message: 'Prolific ID must be exactly 24 alphanumeric characters.'
              }
          ]}
            style={{marginTop:"20px", fontSize:'20px'}}
        >
            <Input style={{ width: '30%', float:'left'}}/>
        </Form.Item>

        <div className="text">
          As a reminder, this study was designed to take no more than 30 minutes. We estimated the study completion time from an initial data collection in person. Your submission may <b>not be approved</b> if your completion time does not fall within an acceptable range. 
        </div>

         <Form.Item >
         
        <Button type="primary" htmlType="submit" style={{display: "flex"}}>
        Submit
        </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};
export default IDContainer;
