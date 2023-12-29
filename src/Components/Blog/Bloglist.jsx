import { auth, db } from "../../Firebase/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  onSnapshot,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import React, { useState, useEffect } from "react";
import "./Bloglist.css";
import Topics from "./Topics";
import { CiSaveDown2 } from "react-icons/ci";

import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/400-italic.css";
import { useNavigate } from "react-router-dom";
import useStatus from "../../hooks/useStatus";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";

import Recommendations from "./Recommendations/Recommendations";

import { debugErrorMap } from "firebase/auth";
import { keywords, topicKeywords } from "./TopicsData.js";

const BlogList = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { isLoading, setError, setIdle, setLoading } = useStatus();

  /* testing db */

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const currentUser = auth?.currentUser;
  const blogsCollection = collection(db, "blogs");

  const handleTopicsChange = (selectedTopics) => {
    // Update the selected topics
    setSelectedTopics(selectedTopics);

    // Filter blogs based on selected topics
    const filteredBlogs = blogs.filter((blog) =>
      selectedTopics.some((topic) => {
        const relativeKeywords = keywords[topic.toLowerCase()];
        const tages = new Set(blog.tags?.map((tag) => tag.toLowerCase()));
        relativeKeywords.push(topic.toLowerCase());
        if (relativeKeywords) {
          return relativeKeywords.some((keyword) =>
            tages.has(keyword.toLowerCase())
          );
        }
      })
    );

    setDisplayedBlogs(filteredBlogs);
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await getDocs(blogsCollection);
        const res = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setBlogs(res);
        setDisplayedBlogs(res);
      } catch (error) {
        alert(error);
      }
    };
    setLoading();
    getBlogs()
      .then(() => setIdle())
      .catch(() => setError());
  }, []);

  // const saveBlogToUserCollection = (blog) => {
  //   //to do
  // };

  const saveBlogToUserCollection = async (blog) => {
    const currentUser = auth.currentUser;
    //console.log(currentUser);
    console.log(blog);
    if (currentUser) {
      const colRef = collection(db, "users");

      try {
        const userDocRef = doc(colRef, currentUser.uid);

        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const blogIds = userData.blogid || [];

          if (!blogIds.includes(blog.id)) {
            // Update the document with the new blog ID
            await updateDoc(userDocRef, {
              blogid: arrayUnion(blog.id),
            });

            // await setDoc(userDocRef, {userUid:currentUser.uid}); // no need

            var myDiv = document.getElementById(`tooltip-${blog.uniqueid}`);
            myDiv.classList.add("active");
            setTimeout(() => {
              myDiv.classList.remove("active");
            }, 1000);

          //  console.log("Blog added to user collection successfully!");
          } else {
           // console.log("Blog already present in user collection.");


            var myDiv = document.getElementById(`tooltip-${blog.uniqueid}`);
            myDiv.classList.add("active");
            setTimeout(() => {
              myDiv.classList.remove("active");
            }, 1000);
          }
        } else {
          // User document does not exist, create user collection and add blog ID
          const user = {
            name: currentUser.displayName,
            email: currentUser.email,
            userUid: currentUser.uid,
            blogid: [blog.id],
          };
          await setDoc(userDocRef, user);

          var myDiv = document.getElementById(`tooltip-${blog.uniqueid}`);
          myDiv.classList.add("active");
          setTimeout(() => {
            myDiv.classList.remove("active");
          }, 1000);
        //  console.log("User collection created, and blog added successfully!");
        }
      } catch (error) {
        console.error("Error updating user collection:", error);
      }
    }
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const searchByTopic = (topic) => {
    const relatedTopic = topicKeywords[topic.toLowerCase()];
    const topicSet = new Set([topic.toLowerCase()]);
    if (relatedTopic) {
      topicSet.add(relatedTopic);
    }
    // Filter blogs based on the entered topic
    const filteredBlogs = blogs.filter((blog) => {
      if (blog.tags) {
        return blog.tags.some((tag) => topicSet.has(tag.toLowerCase()));
      }
    });

    console.log(filteredBlogs);
    setDisplayedBlogs(filteredBlogs);
    setSearchText("");
  };

  const handleSearchByTopic = () => {
    // Trigger search by calling searchByTopic with the entered search text

    searchByTopic(searchText);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Trigger search by calling searchByTopic with the entered search text
      searchByTopic(searchText);
    }
  };

  if (isLoading) {
    return (
      <>
        <AbsoluteSpinner />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-start mt-1 mb-3 w-full ">
        <div className="flex w-[50%] space-x-1 mb-0">
          <input
            type="text"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
         <button
  className="px-4 text-white bg-black rounded-full"
  onClick={handleSearchByTopic}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
</button>

        </div>
      </div>
      <div className="write-first-blog ">
        <div className="flex flex-row justify-start ">
          <div>
            <p>Write your own blog</p>
          </div>
        </div>
        <div className="write-first-blog-desc">
          From technical tutorials to startup experiences, dive into a world of
          insights and learning
        </div>

        <button
          className="write_blog"
          onClick={() => {
            navigate("../new_blog");
          }}
        >
          Write Blog ➔
        </button>
      </div>
      <div className="overall">
        <div className="lefty">
          <Topics onTopicsChange={handleTopicsChange} />
          {displayedBlogs.length !== blogs.length && (
            <button
              onClick={() => {
                let newArray = [];
                selectedTopics.splice(0, selectedTopics.length);
                setSelectedTopics(selectedTopics);
                setDisplayedBlogs(blogs);
              }}
            >
              Clear Filter/Search
            </button>
          )}
          <div className="blog-list">
            {displayedBlogs.map((blog, index) => (
              <div className="blog-item" key={blog.uniqueid}>
                <div className="blog-right">
                  <div
                    className="credentials"
                    onClick={() => handleBlogClick(blog.uniqueid)}
                  >
                    <div className="blog-author">
                      <img
                        className="blog_author_img"
                        src={`https://picsum.photos/${index * 100}`}
                        alt=""
                      />
                      {blog.author}
                    </div>
                    <div className="blog-title">{blog.title}</div>
                  </div>
                  <div className="blog-short-description">
                    {blog.shortDescription}
                  </div>
                  <div className="meta_data_blog">
                    <div className="date">{blog.date}</div>
                    <div className="length">{`${blog.readtime} min read`}</div>
                    <div
                      className="save_blog"
                      onClick={() => saveBlogToUserCollection(blog)}
                    >
                      <span id={`tooltip-${blog.uniqueid}`} className="tooltip">Saved</span>
                      <CiSaveDown2 />
                    </div>
                    {/*CiSaveDown2 */}
                    <div className="blog-tags">
                      {blog.tags?.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="blog-left"
                  onClick={() => handleBlogClick(blog.uniqueid)}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="righty">
          <Recommendations />
        </div>
      </div>
    </>
  );
};

export default BlogList;
