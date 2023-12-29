import React, { useState } from "react";
import "./LandingPage.css";
import Auth from "../Auth/Auth";
import "react-toastify/dist/ReactToastify.css";
import useFirebase from "../../hooks/useFirebase";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useFirebase();

  if (user && user.emailVerified) {
    return <Navigate to={"/"} />;
  }

  // State to manage the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="outer-landing" style={{ width: "100vw", overflow: "none" }}>
      <section className="Intro py-16 ">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/3 pr-4 mb-10 ml-0 lg:ml-12">
            {/* Hide the Auth component on smaller screens */}
            <div className="hidden lg:block">
              <Auth />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="introRightTitle mb-3 lg:ml-14 h-30">
              <h1 className="lg:text-4xl xl:text-4xl md:text-3xl sm:text-lg text-white font-bold leading-tight ml-7">
                Reimagine colleges as hubs <br></br>of{" "}
                <span className="text-pink-500">exploration</span>,{" "}
                <span className="text-yellow-500">creativity</span>, <br></br>
                and <span className="text-blue-500">growth</span>.
              </h1>
            </div>

            <div className="introimg relative">
              <img
                className="people-cartoon w-full max-w-md mx-auto lg:ml-20 mb-8 bgcolor-#242424"
                src="https://drive.google.com/uc?id=1iS6iNzILFH0dBy6lkLFMmbDf91mt2rIn"
                alt="People Cartoon"
              />
            </div>

            {/* Button for Login/Signup - visible on smaller screens */}
            <div className="lg:hidden text-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={toggleModal}
              >
                Login/Signup
              </button>
            </div>

            {/* Modal for Auth component */}
            <div
              className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center transition-opacity ${
                isModalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={toggleModal}
            >
              <div className="bg-white p-8 rounded-lg">
                {/* Render your Auth component here */}
                <Auth />
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex mb-4 items-center justify-center m-auto">
        <div className="collaboration flex flex-col justify-center items-center w-full lg:w-screen">
          <div className="collabTitle font-semibold text-1xl lg:text-2xl sm:text-sm text-white bg-[#242424] w-full text-center">
            Learn and Grow with people from
          </div>

          <div className="collabBox h-24 sm:h-auto w-full lg:w-screen overflow-x-scroll overflow-y-hidden bg-gray-300 rounded-md p-4 flex justify-center lg:justify-between items-center">
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=1t0-AhG00w_dqLIX5ChEN7oC8FuKapIkL"
              alt="Collaboration Image 1"
            />
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=1add8MzGQnx6oiHSH9ymWM15g4VZJ3mWl"
              alt="Collaboration Image 2"
            />
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=1IHErDOomEmcH87V-C-I_x3SIMFf6gjeF"
              alt="Collaboration Image 3"
            />
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=102VZsrgGuv8xpy7Fsk8u1ePpL6ldQOLV"
              alt="Collaboration Image 4"
            />
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=15-IUF2HLVGzlH658zRcGtzzMN8oXLt4M"
              alt="Collaboration Image 5"
            />
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=1BQ89StAoGOhCyr9M7hnniRP7IqIatL-k"
              alt="Collaboration Image 6"
            />
            <img
              className="object-cover h-16"
              src="https://drive.google.com/uc?id=15Alz5cmMpJrHu4hE7ak69777WYHwEuJh"
              alt="Collaboration Image 7"
            />
          </div>
        </div>
      </div>

      <section className="About  ">
        <div class="stats w-screen mx-auto mt-12">
          <div class="statsBox mx-4 lg:mx-10 rounded-lg bg-white shadow-lg p-8">
            <div class="statTitle text-center mb-6 font-bold text-2xl lg:text-3xl">
              Some numbers that matter
            </div>
            <div class="statsSubboxes flex flex-col lg:flex-row justify-around">
              <div class="statsSubBox mb-4 lg:mb-0 text-center flex flex-col items-center">
                <img
                  src="https://drive.google.com/uc?id=1FVY9xQIJbDK2LAGt6Zf0SsBhN69NgH-p"
                  alt="Community Members"
                  class="max-w-full h-auto mb-2"
                />
                <h1 class="text-xl lg:text-2xl font-bold">2000+</h1>
                <h6>Community Members</h6>
              </div>
              <div class="statsSubBox mb-4 lg:mb-0 text-center flex flex-col items-center">
                <img
                  src="https://drive.google.com/uc?id=1jMaGnL6cPhWq1VsXnaAXFAIbv-I_8q8S"
                  alt="Universities Connected"
                  class="max-w-full h-auto mb-2"
                />
                <h1 class="text-xl lg:text-2xl font-bold">150+</h1>
                <h6>Universities Connected</h6>
              </div>
              <div class="statsSubBox mb-4 lg:mb-0 text-center flex flex-col items-center">
                <img
                  src="https://drive.google.com/uc?id=17AzwwQPOb5ra0EN3Z9Tg6yL7Qgi9jQqv"
                  alt="Opportunities Listed"
                  class="max-w-full h-auto mb-2"
                />
                <h1 class="text-xl lg:text-2xl font-bold">300+</h1>
                <h6>Opportunities Listed</h6>
              </div>
              <div class="statsSubBox text-center flex flex-col items-center">
                <img
                  src="https://drive.google.com/uc?id=1636_ZAzFj4MiZDVxVBaKe_hFN5_S3ihm"
                  alt="Blogs Written"
                  class="max-w-full h-auto mb-2"
                />
                <h1 class="text-xl lg:text-2xl font-bold">100+</h1>
                <h6>Blogs Written</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="feature1 ml-5 mr-8 mt-5 flex lg:flex-row flex-col mb-4 h-">
          <div className="feature1Left card1 flex-1 p-8 border border-gray-300 blue rounded-lg">
            <h1 className="lg:text-2xl xl:text-3xl font-bold s mb-4">
              <span style={{ color: "rgba(238, 94, 84, 0.82)" }}>Learn</span>{" "}
              With Blogs
            </h1>
            <div className="text-gray-700  xl:text-1xl lg:text-lg text-sm">
              Unlock a treasure of knowledge and right information shared by
              students and experts. From technical tutorials to startup
              experiences, dive into a world of insights and learning.
            </div>
          </div>
          <div className="feature1Right flex-1 blue rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="https://drive.google.com/uc?id=1xtr14dWhhsmWqaP-vk9p5tzBtS5qNEuC"
              alt="Learn With Blogs"
            />
          </div>
        </div>

        <div className="feature1 ml-5 mr-8 block2 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card2 flex-1 p-8 border border-gray-300 red rounded-lg">
            <h1
              className="lg:text-2xl xl:text-3xl font-bold "
              style={{ color: "Black" }}
            >
              Find the Right <span style={{ color: "#FFE8B6" }}>Partners</span>
            </h1>
            <p className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Connect with like-minded individuals and potential collaborators
              to turn your ideas into reality. Whether it's a startup, project,
              or research initiative, we help you find the perfect match.
            </p>
          </div>
          <div className="feature1Right flex-1 red rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="https://drive.google.com/uc?id=1PRrlFLY2baZmeu-oVJMvCiP2v4znh-cl"
              alt="Find the Right Partners"
            />
          </div>
        </div>

        <div className="feature1 ml-5 mr-8 block3 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card3 flex-1 p-8 border border-gray-300 yellow rounded-lg">
            <h1 className="lg:text-2xl xl:text-3xl">
              Discover{" "}
              <span style={{ color: "rgba(67, 122, 255, 1)" }}>
                Opportunities
              </span>
            </h1>
            <p className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Explore a vast array of opportunities, including exclusive
              internships, projects, and events. Broaden your horizons and grow
              both personally and professionally.
            </p>
          </div>
          <div className="feature1Right flex-1 yellow rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="https://drive.google.com/uc?id=1bQZzCwZwQM5joFb0kHtUvQCcXli2HpjU"
              alt="Discover Opportunities"
            />
          </div>
        </div>

        <div className="feature1 ml-5 mr-8 block4 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card4 flex-1 p-8 border border-gray-300 bg-purple-100 rounded-lg">
            <h1 className="lg:text-2xl xl:text-3xl">
              <span style={{ color: "rgba(0, 201, 184, 0.83)" }}>Network</span>{" "}
              with People
            </h1>
            <p className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Connect with students and professionals from different colleges
              worldwide. Expand your network, exchange ideas, and build lifelong
              connections.
            </p>
          </div>
          <div className="feature1Right flex-1 bg-gray-500 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="https://drive.google.com/uc?id=1xy7wYu9dY4_ixpxJ5mmSUQSA_HKJBxEZ"
              alt="Network with People"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
