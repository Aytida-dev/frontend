import React, { useState } from "react";
import "./Profile.css";
import useFirebase from "../../hooks/useFirebase";
import { addDoc, collection } from "firebase/firestore";

const interests = [
  "EXPLORING",
  "SOFTWARE DEVELOPMENT",
  "ML/AI",
  "STARTUPS",
  "FINANCE",
  "PRODUCT",
  "DESIGN",
  "CONSULTING",
  "WEB DEVELOPMENT",
  "PERSONAL GROWTH",
  "ENGINEERING",
  "HIGHER STUDIES",
];

export default function Profile() {
  const { user, db } = useFirebase();

  const [currentPart, setCurrentPart] = useState(1);
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
  );
  const [universityName, setUniversityName] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [githubProfile, setGithubProfile] = useState("");
  const [twitterProfile, setTwitterProfile] = useState("");

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      // Remove the interest if it's already selected
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((item) => item !== interest)
      );
    } else {
      // Add the interest if it's not selected
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleNext = () => {
    setCurrentPart((prevPart) => prevPart + 1);
  };

  const handleNextPart1 = () => {
    if (username && selectedImage && universityName && yearOfStudy) {
      handleNext();
    } else {
      alert("Please fill in all the details.");
    }
  };

  const handleNextPart2 = () => {
    if (selectedInterests.length > 0) {
      handleNext();
    } else {
      alert("Please select at least one interest.");
    }
  };

  const handleSubmit = async () => {
    if (linkedinProfile || githubProfile || twitterProfile) {
      try {
        const profilesRef = collection(db, "profiles");
        await addDoc(profilesRef, {
          username,
          universityName,
          yearOfStudy,
          selectedInterests,
          linkedinProfile,
          githubProfile,
          twitterProfile,
        });

        alert("Profile submitted successfully!");
      } catch (error) {
        alert("Error submitting profile: " + error.message);
      }
    } else {
      alert("Please add at least one social profile link.");
    }
  };

  const handlePrevious = () => {
    setCurrentPart((prevPart) => prevPart - 1);
  };

  const renderPart = () => {
    switch (currentPart) {
      case 1:
        return (
          <>
            <div className="profile-header">
              <img src="logo.jpeg" alt="" />
              <span>YOUR PERSONAL DETAILS</span>
            </div>
            <div className="profile-body">
              <div className="row-first">
                <div className="column-first">
                  <div className="user-name">
                    <h2>Your Name</h2>
                    <input
                      type="text"
                      value={username}
                      placeholder="Enter your Name"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="user-pic">
                    <h2>Pick a Profile Photo</h2>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="column-second">
                  <img src={selectedImage} alt="" className="profile-picture" />
                </div>
              </div>
              <div className="row-second">
                <div className="user-education">
                  <div>
                    <h2>Your University</h2>
                    <input
                      type="text"
                      value={universityName}
                      placeholder="Enter University Name"
                      onChange={(e) => setUniversityName(e.target.value)}
                    />
                  </div>
                  <div>
                    <h2>Year of Study</h2>
                    <input
                      type="text"
                      value={yearOfStudy}
                      placeholder="Enter year of Study"
                      onChange={(e) => setYearOfStudy(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <button style={{ visibility: "hidden" }}></button>
              <button className="next-btn btn" onClick={handleNextPart1}>
                Next &#8680;
              </button>
            </div>
            <div className="footer-container">
              <div
                className="profile-footer"
                style={{
                  width: "33%",
                  borderRadius: "10px 0 0 10px",
                  backgroundColor: "#ff0000",
                }}
              >
                weak
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="profile-header">
              <img src="logo.jpeg" alt="" />
              <span>WHAT ARE YOU INTERESTED IN?</span>
            </div>
            <div className="profile-body">
              <div className="interests">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    className={
                      selectedInterests.includes(interest) ? "selected" : ""
                    }
                    onClick={() => handleInterestClick(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div className="buttons-container">
              <button className="previous-btn btn" onClick={handlePrevious}>
                &#8678; Previous
              </button>
              <button className="next-btn btn" onClick={handleNextPart2}>
                Next &#8680;
              </button>
            </div>
            <div
              className="profile-footer"
              style={{
                width: "66%",
                borderRadius: "10px 0 0 10px",
                backgroundColor: "#f1c232",
              }}
            >
              medium
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="profile-header">
              <img src="logo.jpeg" alt="" />
              <span>LINK YOUR SOCIALS</span>
            </div>
            <div className="profile-body">
              <div className="social-links">
                <div className="linkedin">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0adDoUGWVD3jGzfT8grK5Uhw0dLXSk3OWJwZaXI-t95suRZQ-wPF7-Az6KurXDVktV4&usqp=CAU"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="Add LinkedIn profile"
                    value={linkedinProfile}
                    onChange={(e) => setLinkedinProfile(e.target.value)}
                  />
                </div>
                <div className="github">
                  <img
                    src="https://avatars.slack-edge.com/2020-11-25/1527503386626_319578f21381f9641cd8_512.png"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="Add Github profile"
                    value={githubProfile}
                    onChange={(e) => setGithubProfile(e.target.value)}
                  />
                </div>
                <div className="twitter">
                  <img
                    src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0-1.jpg"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="Add Twitter profile"
                    value={twitterProfile}
                    onChange={(e) => setTwitterProfile(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <button className="previous-btn btn" onClick={handlePrevious}>
                &#8678; Previous
              </button>
              <button className="submit-btn btn" onClick={handleSubmit}>
                Submit &#8680;
              </button>
            </div>
            <div
              className="profile-footer"
              style={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#0bd417",
              }}
            >
              strong
            </div>{" "}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="profile-section">
        <div className="profile-container">{renderPart()}</div>
      </div>
    </>
  );
}
