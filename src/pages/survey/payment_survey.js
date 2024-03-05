import { React, useState } from "react";
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
import "./survey.css";
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


const PaymentSurveyContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let copySaveArray = values;
    setAnswers(values);
    // save data
    let data_send = {
      'userID': localStorage['user-id'], 
      'survey_data':values
    };
    sendData(data_send);
    let path = "/#/End";
    window.location.assign(path);
  };

  const sendData = (obj) => {
    fetch('http://127.0.0.1:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify({
        group: localStorage['group'], 
        folder: 'demo',
        content: obj
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(message => {
        console.log(message)
      })
  }; 

  return (
    <div className="container"> 
      <div className="title"> Demographic questions</div>
      <Form {...formItemLayout} layout='vertical'
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
        }}
      >

        <Form.Item             
            name="age"
            label={
              <p style={{fontSize: "20px"}}> Please provide your age as a number (e.g., 32).</p>}
            rules={[{
              required: true,
            },
          ]}
            style={{marginTop:"20px", fontSize:'20px'}}
        >
            <Input style={{ width: '20%', float:'left'}}/>
        </Form.Item>

        <Form.Item 
            name="gender" 
            label = {
                <p style={{fontSize: "18px"}}> Gender</p>}
            rules={[{
                      required: true,
                    },
                  ]}>
            <Select 
                allowClear
            >
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
                <Select.Option value="none">prefer not to say</Select.Option>
                <Select.Option value="other">other</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item 
            name="education" 
            label = {
                <p style={{fontSize: "18px"}}> Education level</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Select>
                <Select.Option value="1">Graduated from high school</Select.Option>
                <Select.Option value="2">Currently in college</Select.Option>
                <Select.Option value="3">Graduated from college</Select.Option>
                <Select.Option value="4">In graduate school</Select.Option>
                <Select.Option value="5">Completed graduate school</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item 
            name ="ai" 
            label= {
                <p style={{fontSize: "18px"}}> On a scale from 1 to 5, please rate your level of familiarity with Artificial Intelligence technology</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Select>
                <Select.Option value="1">1 (Not at all familiar)</Select.Option>
                <Select.Option value="2">2 (Slightly familiar)</Select.Option>
                <Select.Option value="3">3 (Somewhat familiar)</Select.Option>
                <Select.Option value="4">4 (Moderately familiar)</Select.Option>
                <Select.Option value="5">5 (Extremely familiar)</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item 
            name ="check" 
            label= {
                <p style={{fontSize: "18px"}}>What was the monetary compensation mentioned at the beginning of this study for your participation?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Select>
                <Select.Option value="1"> 6 USD </Select.Option>
                <Select.Option value="2"> 3 USD + bonus </Select.Option>
                <Select.Option value="3"> No compensation </Select.Option>
            </Select>
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
export default PaymentSurveyContainer;
