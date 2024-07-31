import { Button, Radio, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import "./eyegazeEnd.css";

const imageFolder = "/attention_check_image_folder";

function EyegazeEndContainer() {
  const [agree, setAgree] = useState(false);
  const [code, setCode] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Function to randomly select 6 images
    const fetchImages = async () => {
      // Fetch all image file names from the folder
      const images = [
        "image1.png",
        "image2.png",
        "image3.png",
        "image4.png",
        "image5.png",
        "image6.png",
        "image7.png",
        "image8.png",
        "image9.png",
        "image10.png",
        "image11.png",
        "image12.png",
      ]; // Mock image names
      const shuffledImages = images.sort(() => 0.5 - Math.random());
      const selected = shuffledImages.slice(0, 6);
      setSelectedImages(selected);
    };

    fetchImages();
  }, []);

  const handleResponseChange = (image, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [image]: value,
    }));
  };

  const routeChange = () => {
    if (true) {
      //(code === "password123") {
      let path = "/#/Demo";
      window.locatiosn.assign(path);
    } else {
      alert("The code doesn't match and you can't continue.");
    }
  };

  // Retrieve the user-id from localStorage
  const userId = localStorage.getItem("user-id");

  const imageQuestions = {
    "image1.png": {
      question:
        "What color jerseys were the soccer players that are blocked out wearing?",
      options: ["Red", "Blue", "Yellow", "Orange"],
    },
    "image2.png": {
      question: "How many people are sitting on the bench?",
      options: ["1", "2", "3", "4"],
    },
    "image3.png": {
      question: "Select all the items that showed up in the image.",
      options: ["Bike", "Red Car", "Traffic Light"],
    },
    "image4.png": {
      question: "What is the boy on in the picture?",
      options: ["Bicyle", "Scooter", "Skateboard", "Roller Skates"],
    },
    "image5.png": {
      question: "Is the person wearing a backpack?",
      options: ["Yes", "No"],
    },
    "image6.png": {
      question: "How many people are fishing?",
      options: ["1", "2", "3", "4"],
    },
    "image7.png": {
      question: "Select all the items in the picture.",
      options: [
        "White hat",
        "Silver cooking bowl",
        "White shorts",
        "Yellow shoes",
      ],
    },
    "image8.png": {
      question: "What color is the car?",
      options: ["Red", "Orange", "Yellow", "Green"],
    },
    "image9.png": {
      question: "How many people standing in the red box?",
      options: ["1", "2", "3", "4"],
    },
    "image10.png": {
      question: "Select all the items that appear in the red boxes.",
      options: ["Woman", "Plant", "Fish", "Flowers", "Grey Rocks"],
    },
    "image11.png": {
      question: "What/Who is sitting next to the man in the bench?",
      options: ["Dog", "Cat", "Man", "Woman"],
    },
    "image12.png": {
      question: "Select the all items that appear in the red boxes.",
      options: ["Man", "Horse", "Fire", "Tree", "Rabbit"],
    },
  };

  return (
    <div className="formatting">
      <div>
        <h1>
          {" "}
          Please answer these questions about the images that you have seen
          before.{" "}
        </h1>
        {selectedImages.map((image) => (
          <div key={image} className="image-container">
            <img
              src={`${imageFolder}/${image}`}
              alt={image}
              className="attention-check-image"
            />
            <div>
              <p>{imageQuestions[image].question}</p>
              {[
                "image3.png",
                "image7.png",
                "image10.png",
                "image12.png",
              ].includes(image) ? (
                <Checkbox.Group
                  options={imageQuestions[image].options}
                  onChange={(checkedValues) =>
                    handleResponseChange(image, checkedValues)
                  }
                />
              ) : (
                <Radio.Group
                  onChange={(e) => handleResponseChange(image, e.target.value)}
                >
                  {imageQuestions[image].options.map((option, index) => (
                    <Radio key={index} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button onClick={routeChange}>Continue</Button>
      </div>
    </div>
  );
}

export default EyegazeEndContainer;
