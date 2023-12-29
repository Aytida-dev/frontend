// HorizontalScrollableLogos.js

import React, { useState } from "react";
import "./Topics.css";
import career from "./images/career.png";
import ai from "./images/ai.png";
import software from "./images/software.png";
import startup from "./images/startup.png";
import tech from "./images/tech.png";
import product from "./images/product.png"
import college from "./images/college.png"
import internship from "./images/internship.png"
import ml from "./images/ml.png"
import experiences from "./images/experiences.png"
const logos = [
  { id: 1, src: software, caption: "Software", value: "software" },
  { id: 2, src: career, caption: "Career", value: "career" },
  {
    id: 3,
    src: product,
    caption: "Product",
    value: "product",
  },
  {
    id: 4,
    src:internship,
    caption: "Internships",
    value: "internships",
  },
  {
    id: 5,
    src: college,
    caption: "College",
    value: "college",
  },
  {
    id: 6,
    src: ml,
    caption: "Machine learning",
    value: "machinelearning",
  },
  {
    id: 7,
    src:experiences,
    caption: "Experiences",
    value: "experiences",
  },
  { id: 8, src: startup, caption: "Startup", value: "startup" },
  { id: 9, src: tech, caption: "Tech", value: "tech" },
  { id: 10, src: ai, caption: "AI", value: "ai" },
];

const Topics = ({ onTopicsChange }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleClick = (topic) => {
    // Toggle the selected state of the clicked topic
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    // Update the state and notify the parent component
    setSelectedTopics(updatedTopics);
    onTopicsChange(updatedTopics);
  };
  return (
    <div className="horizontal-scrollable-logos">
      {logos.map((logo) => (
        <div
          key={logo.id}
          className="logo-card"
          onClick={() => handleClick(logo.value)}
        >
          <img src={logo.src} alt={logo.caption}  />
          <p className="caption">{logo.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default Topics;
