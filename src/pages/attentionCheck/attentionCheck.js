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
import "./attentionCheck.css";
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
  "The AI-generated captions cover salient (notable) information present in the images.",
  "The AI-generated captions include accurate and precise information from the images.",
  "The AI helps me to create better captions.",
  "I find useful the AI-generated captions.",
];

const questions2 = [
  "I had to work hard to accomplish better captions.",
  "I was really drawn into this captioning experience with AI assistance.",
  "I felt involved in this captioning experience with AI assistance.",
  "I felt discouraged while using AI assistance in this captioning experience.",
];

const FormItem = ({ question, idx }) => {
  const style = { fontSize: "15px", marginLeft: "14px", marginRight: "14px" };
  return (
    <Form.Item
      name={`Q${idx + 1}`}
      label={
        <p style={{ fontSize: "19px" }}>
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

const AttentionCheckContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});

  const [next, setNext] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    //let copySaveArray = values
    // save data
    if (next) {
      let copySaveArray = Object.assign({}, answers, values);
      setAnswers(copySaveArray);
      let data_send = {
        userID: localStorage["user-id"],
        survey_data: copySaveArray, // values
      };
      //sendData(data_send);
      console.log("Survey Data sent:", data_send);
      let path = "/#/Demo";
      window.location.assign(path);
    } else {
      let copySaveArray = Object.assign({}, answers, values);
      setAnswers(copySaveArray);
      setNext(true);
      window.scrollTo(0, 0);
    }
  };

  const sendData = (obj) => {
    fetch("http://127.0.0.1:8080/surveyData", {
      method: "POST",
      body: JSON.stringify({
        group: localStorage["group"],
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
                  key={idx + 4}
                  class="form-questions"
                  question={question}
                  idx={idx + 4}
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
export default AttentionCheckContainer;
