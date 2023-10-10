import { React, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
  // Radio,
  // Input,
  Button,
  Radio,
} from "antd";
import "./survey.css";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 22,
    offset: 1,
  },
  wrapperCol: {
    span: 30,
    offset: 1,
  },
};

const questions = [
  "What is the monetary compensation you will receive for participating in this study?"
];

const FormItem = ({ question, idx }) => {
  const style = { fontSize: "15px", marginLeft: "30px", marginRight: "30px" };
  return (
    <Form.Item
      name={`Q${idx + 1}`}
      label={
        <p style={{ fontSize: "18px" }}>
          {" "}
          {idx + 1}. {question}
        </p>
      }
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Radio.Group>
        <Radio value="5" style={style}>
          5 USD
        </Radio>
        <Radio value="No" style={style}>
          2 USD + bonus
        </Radio>
        <Radio value="None" style={style}>
          No compensation
        </Radio>
      </Radio.Group>
    </Form.Item>
  );
};



const PaymentSurveyContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let copySaveArray = values;
    setAnswers(values);
    // save data
    let data = {
      user_id: localStorage.getItem("user-id"),
      q1: 1,
      q2: 2,
    };
    sendData(data);
    let path = "/#/End";
    window.location.assign(path);
  };

  const sendData = (obj) => {
    fetch("http://localhost:8080/surveyData", {
      method: "POST",
      body: JSON.stringify(obj),
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
      <Form
        {...formItemLayout}
        layout="vertical"
        name="validate_other"
        onFinish={onFinish}
        initialValues={{}}
      >
        <div className="title">Evaluation Questions</div>

        <div>
          {questions.map((question, idx) => (
            <FormItem
              key={idx}
              class="form-questions"
              question={question}
              idx={idx}
            />
          ))}
        
        </div>

        
        <Form.Item>
        
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default PaymentSurveyContainer;
