import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { auth } from "../../Firebase/firebase";
import { db } from "../../Firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

import { getDocs, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./New_Blog.css";
import useStatus from "../../hooks/useStatus";
import useFirebase from "../../hooks/useFirebase";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { toast } from "react-toastify";

const New_Blog = () => {
  const blogsCollection = collection(db, "blogs");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [publishing, setPublishing] = useState(false); // State to manage the image modal
  const storage = getStorage();
  const { user } = useFirebase();

  const { isLoading, setLoading, setIdle } = useStatus();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, "bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleAddTag = () => {
    if (tags.length < 3 && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const openImageModal = () => {
    document.getElementById("whole").style.opacity = 0.5;
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    document.getElementById("whole").style.opacity = 1;
    setImageModalOpen(false);
  };

  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    function getDayWithSuffix(day) {
      if (day >= 11 && day <= 13) {
        return day + "th";
      }
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    }

    const formattedDate = `${getDayWithSuffix(day)} ${month}`;

    return formattedDate;
  }

  function calculateReadingTime(text, wordsPerMinute = 200) {
    const wordCount = text.split(/\s+/).length;

    const readingTimeMinutes = wordCount / wordsPerMinute;

    return Math.ceil(readingTimeMinutes);
  }

  function extractFirstSentence(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    let firstSentence = "";

    const textNodes = doc.body.childNodes;
    for (let i = 0; i < textNodes.length; i++) {
      const textNode = textNodes[i];
      if (textNode.nodeType === Node.TEXT_NODE) {
        const text = textNode.textContent.trim();
        if (text) {
          const sentences = text.split(/[.!?]/);

          for (const sentence of sentences) {
            if (sentence.trim()) {
              firstSentence = sentence.trim();
              break;
            }
          }
          if (firstSentence) {
            break;
          }
        }
      }
    }

    return firstSentence;
  }

  const Publish = async () => {
    setContent(DOMPurify.sanitize(content));
    setLoading();

    const sanitizedContent = content?.replace(/<\/?[^>]+>/g, "");
    const date = new Date();
    const formattedDate = formatDate(date);
    const blogData = {
      uniqueid: v4(),
      title: title,
      content: content,
      author: user.displayName,
      tags: tags,
      date: formattedDate,
      readtime: calculateReadingTime(content),
      shortDescription:
        extractFirstSentence(sanitizedContent).substring(0, 24) + "...",
    };

    if (image) {
      try {
        const imageRef = ref(storage, `blog_images/${image.name + v4()}`);

        await uploadBytes(imageRef, image);

        const imageUrl = await getDownloadURL(imageRef);

        blogData.image = imageUrl;
      } catch (error) {
        toast("Unable to upload the image");
        console.error(error);
        return;
      }
    }

    try {
      await addDoc(blogsCollection, blogData);
    } catch (error) {
      toast("Unable to upload the blog");
    } finally {
      setIdle();
    }

    navigate("../blogs");
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
      {publishing && <span className="loader"></span>}
      {isImageModalOpen && (
        <div className="image-upload-modal">
          <h2>Add an Image for the Blog</h2>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <span className="close-icon" onClick={closeImageModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              enable-background="new 0 0 40 40"
            >
              <line
                x1="15"
                y1="15"
                x2="25"
                y2="25"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-miterlimit="10"
              ></line>
              <line
                x1="25"
                y1="15"
                x2="15"
                y2="25"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-miterlimit="10"
              ></line>
              <circle
                className="circle"
                cx="20"
                cy="20"
                r="19"
                opacity="0"
                stroke="#000"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-miterlimit="10"
                fill="none"
              ></circle>
              <path
                d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z"
                class="progress"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-miterlimit="10"
                fill="none"
              ></path>
            </svg>
          </span>
          <button className="publish-from-modal" onClick={Publish}>
            Publish
          </button>
        </div>
      )}
      <div className="blog-editor" id="whole">
        <button className="publish-button" onClick={openImageModal}>
          Publish
        </button>

        <input
          className="editor-title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
        <input
          className="tag-input"
          type="text"
          placeholder="Add Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button className="add-tag-button" onClick={handleAddTag}>
          Add Tag
        </button>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
              <span className="remove-tag" onClick={() => handleRemoveTag(tag)}>
                ✖️
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default New_Blog;
