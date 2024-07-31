import { Button, Radio } from "antd";
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
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image2.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image3.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image4.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image5.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image6.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image7.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image8.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image9.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image10.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image11.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    "image12.png": {
      question: "What is shown in this image?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
  };

  return (
    <div className="formatting">
      <div>
        {selectedImages.map((image) => (
          <div key={image} className="image-container">
            <img
              src={`${imageFolder}/${image}`}
              alt={image}
              className="attention-check-image"
            />
            <div>
              <p>{imageQuestions[image].question}</p>
              <Radio.Group
                onChange={(e) => handleResponseChange(image, e.target.value)}
              >
                {imageQuestions[image].options.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
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
