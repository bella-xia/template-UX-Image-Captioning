import { Button, Radio, Checkbox, Form } from "antd";
import React, { useState, useEffect } from "react";
import "./eyegazeEnd.css";

const imageFolder = "/attention_check_image_folder";

const EyegazeEndContainer = () => {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [responses, setResponses] = useState({});
  const [allAnswered, setAllAnswered] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const images = [
        "image1",
        "image2",
        "image3",
        "image4",
        "image5",
        "image6",
        "image7",
        "image8",
        "image9",
        "image10",
        "image11",
        "image12",
      ];
      const shuffledImages = images.sort(() => 0.5 - Math.random());
      const selected = shuffledImages.slice(0, 6);
      setSelectedImages(selected);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const answeredAll = selectedImages.every(
      (image) => responses.hasOwnProperty(image) && responses[image].length > 0
    );
    setAllAnswered(answeredAll);
  }, [responses, selectedImages]);

  const handleResponseChange = (image, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [image.split('.')[0]]: value,
    }));
  };

  const sendData = (obj) => {
    fetch(localStorage['backend_path'].concat('/surveyData'), {
      method: "POST",
      body: JSON.stringify({
        userID: localStorage["user-id"],
        group: localStorage["group"],
        folder: "attention",
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

  const onFinish = (values) => {
    console.log("values", values);

    // formatting values to str
    const stringifiedValues = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        stringifiedValues[key] = Array.isArray(values[key])
          ? values[key].join(", ") // Join array values into a single string
          : values[key].toString(); // Convert non-array values to strings
      }
    }
    console.log("all strings", stringifiedValues)
    let copySaveArray = Object.assign({}, answers, stringifiedValues);
    setAnswers(copySaveArray);
    let data_send = {
      'survey_data': copySaveArray,
    };
    sendData(data_send);
    let path = "/#/Demo";
    window.location.assign(path);
    window.scrollTo(0, 0);
  };

  const imageQuestions = {
    "image1": {
      question:
        "What color jerseys were the soccer players that are blocked out wearing?",
      options: ["Red", "Blue", "Yellow", "Orange"],
    },
    "image2": {
      question: "How many people are sitting on the bench?",
      options: ["1", "2", "3", "4"],
    },
    "image3": {
      question: "Select all the items that appear in the red boxes.",
      options: ["Bike", "Red Car", "Traffic Light"],
    },
    "image4": {
      question: "What is the boy on in the picture?",
      options: ["Bicyle", "Scooter", "Skateboard", "Roller Skates"],
    },
    "image5": {
      question: "Is the person wearing a backpack?",
      options: ["Yes", "No"],
    },
    "image6": {
      question: "How many people are fishing?",
      options: ["1", "2", "3", "4"],
    },
    "image7": {
      question: "Select all the items that appear in the red boxes.",
      options: [
        "White hat",
        "Silver cooking bowl",
        "White shorts",
        "Yellow shoes",
      ],
    },
    "image8": {
      question: "What color is the car?",
      options: ["Red", "Orange", "Yellow", "Green"],
    },
    "image9": {
      question: "How many people standing in the red box?",
      options: ["1", "2", "3", "4"],
    },
    "image10": {
      question: "Select all the items that appear in the red boxes.",
      options: ["Woman", "Plant", "Fish", "Flowers", "Grey Rocks"],
    },
    "image11": {
      question: "What/Who is sitting next to the man in the bench?",
      options: ["Dog", "Cat", "Man", "Woman"],
    },
    "image12": {
      question: "Select all the items that appear in the red boxes.",
      options: ["Man", "Horse", "Fire", "Tree", "Rabbit"],
    },
  };

  return (
    <div className="formatting">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{}}
      >
        <div>
          <h1>
            Please answer these questions about the images that you have seen
            before.
          </h1>
          {selectedImages.map((image, index) => (
            <div key={image} className="image-container">
              <p>
                  <strong>{`${index + 1}. ${
                    imageQuestions[image].question
                  }`}</strong>
              </p>
              <img
                src={`${imageFolder}/${image}.png`}
                alt={image}
                className="attention-check-image"
              />
              <div>
                {[
                  "image3",
                  "image7",
                  "image10",
                  "image12",
                ].includes(image) ? (
                  <Form.Item
                    name={image}
                    rules={[
                      { required: true, message: "Please select an option" },
                    ]}
                  >
                    <Checkbox.Group
                      className="checkbox-group"
                      options={imageQuestions[image].options}
                      onChange={(checkedValues) =>
                        handleResponseChange(image, checkedValues)
                      }
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name={image}
                    rules={[
                      { required: true, message: "Please select an option" },
                    ]}
                  >
                    <Radio.Group
                      className="radio-group"
                      onChange={(e) =>
                        handleResponseChange(image, e.target.value)
                      }
                    >
                      {imageQuestions[image].options.map((option, index) => (
                        <Radio key={index} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                )}
              </div>
            </div>
          ))}
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!allAnswered}>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EyegazeEndContainer;
