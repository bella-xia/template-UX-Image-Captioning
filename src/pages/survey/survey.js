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
  "The AI-generated captions cover salient information present in the images.",
  "The AI-generated captions include accurate and precise information from the images.",
  "The AI helps me to create better captions.",
  "I find useful the AI-generated captions.",
  "I had to work hard to accomplish better captions.",
  "I was really drawn into this captioning experience with AI assistance.",
  "I felt involved in this captioning experience with AI assistance.",
  "I felt discouraged while using AI assistance in this captioning experience."
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
        <Radio value="1" style={style}>
          1 - strongly disagree
        </Radio>
        <Radio value="2" style={style}>
          2 - disagree
        </Radio>
        <Radio value="3" style={style}>
          3 - somewhat disagree
        </Radio>
        <Radio value="4" style={style}>
          4 - neutral
        </Radio>
        <Radio value="5" style={style}>
          5 - somewhat agree
        </Radio>
        <Radio value="6" style={style}>
          6 - agree
        </Radio>
        <Radio value="7" style={style}>
          7 - strongly agree
        </Radio>
      </Radio.Group>
    </Form.Item>
  );
};

const SurveyContainer = () => {
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
    let path = "/#/PaymentSurvey";
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

        On a scale from 1 (strongly disagree) to 7 (strongly agree), rate your agreement with the following statements:

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
export default SurveyContainer;
