import { React, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { Form, Select, Button, Radio } from "antd";
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

const questions1 = [
  "I was fully concentrated on the task of editing captions.",
  "Improving the captions for visually impaired audiences gave me a sense of personal involvement or contribution to a larger cause.",
  "I found the task of providing detailed and accurate captions for each image extremely rewarding.",
  "I found the task of editing AI captions to improve captions for visually impaired audiences very unique.",
  "Editing AI-generated captions introduced me to many new ideas or concepts about accessibility.",
];

const questions2 = [
  "I had to work hard to accomplish better captions.",
  "Please select 'strongly agree' to show you are paying attention to this question.",
  "I was really drawn into this captioning experience with AI assistance.",
  "I felt involved in this captioning experience with AI assistance.",
  "I was very focused on the task of editing the captions for accuracy and detail.",
  "Using AI to improve captions for the visually impaired differed strongly from my expectations.",
];

const FormItem = ({ question, idx }) => {
  const style = { fontSize: "15px", marginLeft: "14px", marginRight: "14px" };

  // Define the options for the agreement scale
  const options = [
    { value: "strongly disagree", label: "1 - strongly disagree" },
    { value: "disagree", label: "2 - disagree" },
    { value: "somewhat disagree", label: "3 - somewhat disagree" },
    { value: "neutral", label: "4 - neutral" },
    { value: "somewhat agree", label: "5 - somewhat agree" },
    { value: "agree", label: "6 - agree" },
    { value: "strongly agree", label: "7 - strongly agree" },
  ];

  // Randomly decide to reverse the options or not
  const shuffledOptions =
    Math.random() > 0.5 ? options : [...options].reverse();

  return (
    <Form.Item
      name={`Q${idx + 1}`}
      label={
        <p style={{ fontSize: "19px" }}>
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
        {shuffledOptions.map((option) => (
          <Radio key={option.value} value={option.value} style={style}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

const SurveyContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});
  const [next, setNext] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    // Print each question and its corresponding answer
    Object.keys(values).forEach((key) => {
      console.log(`${key}: ${values[key]}`);
    });

    if (next) {
      let copySaveArray = Object.assign({}, answers, values);
      setAnswers(copySaveArray);
      let data_send = {
        survey_data: copySaveArray,
      };
      sendData(data_send);
      console.log("Survey Data sent:", data_send);
      let path = "/#/SurveyEnd";
      window.location.assign(path);
      window.scrollTo(0, 0);
    } else {
      let copySaveArray = Object.assign({}, answers, values);
      setAnswers(copySaveArray);
      setNext(true);
    }
  };

  const sendData = (obj) => {
    fetch(localStorage["backend_path"].concat("/surveyData"), {
      method: "POST",
      body: JSON.stringify({
        userID: localStorage["user-id"],
        group: localStorage["exp"],
        folder: "survey",
        content: obj,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
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
        <div className="text">
          On a scale from 1 (strongly disagree) to 7 (strongly agree), rate your
          agreement with the following statements:
        </div>
        {!next ? (
          <>
            <div className="text">
              {questions1.map((question, idx) => (
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
                Continue
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <div className="text">
              {questions2.map((question, idx) => (
                <FormItem
                  key={idx + 5}
                  class="form-questions"
                  question={question}
                  idx={idx + 5}
                />
              ))}
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Continue
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default SurveyContainer;
