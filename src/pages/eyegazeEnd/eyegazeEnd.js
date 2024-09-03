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
        "Image_1",
        "Image_2",
        "Image_3",
        "Image_5",
        "Image_6",
        "Image_7",
        "Image_9",
        "Image_10",
        "Image_11",
        "Image_12",
        "Image_13",
        "Image_15",
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
      [image.split(".")[0]]: value,
    }));
  };

  const sendData = (obj) => {
    fetch(localStorage["backend_path"].concat("/surveyData"), {
      method: "POST",
      body: JSON.stringify({
        userID: localStorage["user-id"],
        group: localStorage["exp"],
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

    const stringifiedValues = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        stringifiedValues[key] = Array.isArray(values[key])
          ? values[key].join(", ")
          : values[key].toString();
      }
    }
    console.log("all strings", stringifiedValues);
    let copySaveArray = Object.assign({}, answers, stringifiedValues);
    setAnswers(copySaveArray);
    let data_send = {
      survey_data: copySaveArray,
    };
    sendData(data_send);
    let path = "/#/Demo";
    window.location.assign(path);
    window.scrollTo(0, 0);
  };

  const imageQuestions = {
    Image_1: {
      question: "Is the color of the covered horse?",
      options: [
        "Same as the horse next to the girl",
        "Lighter than the horse next to the girl",
        "Darker than the horse next to the girl",
      ],
    },
    Image_2: {
      question: "How many fish are in the pond?",
      options: ["1", "2", "3", "4"],
    },
    Image_3: {
      question: "What is the person doing?",
      options: ["Standing", "Taking a photo", "Fishing"],
    },
    Image_5: {
      question: "What type of flag is covered?",
      options: [
        "U.S.A Flag",
        "New York State Flag",
        "U.N. Flag",
        "Canadian Flag",
      ],
    },
    Image_6: {
      question: "Select all the things that are covered.",
      options: ["Person", "Garbage can", "Plants", "Traffic light"],
    },
    Image_7: {
      question: "What color are the shorts?",
      options: ["Black", "Grey", "White", "Navy"],
    },
    Image_9: {
      question: "Does the car have a roof rack?",
      options: ["Yes", "No"],
    },
    Image_10: {
      question: "What color is the dog on the bench?",
      options: ["White", "Black", "Brown", "Tan"],
    },
    Image_11: {
      question: "What color is the boat?",
      options: ["Blue", "Grey", "White", "Black"],
    },
    Image_12: {
      question: "Select all the colors that DO NOT show up on the boy's shirt.",
      options: ["White", "Yellow", "Blue", "Red"],
    },
    Image_13: {
      question: "What number appears on the jersey?",
      options: ["11", "23", "21", "13"],
    },
    Image_15: {
      question: "Select all the items that the person is wearing.",
      options: [
        "Red backpack",
        "Black shirt",
        "White pants",
        "Light-colored hat ",
      ],
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
                {["Image_6", "Image_12", "Image_15"].includes(image) ? (
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