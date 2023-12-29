import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogComponent from "./BlogComponent";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import useStatus from "../../hooks/useStatus";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const { isLoading, setLoading, setIdle, setError } = useStatus();
  const blogsCollection = collection(db, "blogs");

  const { id } = useParams();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await getDocs(blogsCollection);
        const res = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        let thisblog = res.find((blog) => blog.uniqueid === id); // was not working with .id

        setBlog(thisblog);
      } catch (error) {
        alert(error);
      }
    };

    setLoading();
    getBlogs()
      .then(() => setIdle())
      .catch(() => setError());
  }, []);

  if (isLoading) {
    return <AbsoluteSpinner />;
  }
  return <BlogComponent blog={blog} />;
};

export default Blog;
