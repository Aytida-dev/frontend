import React from "react";
import "./BlogComponent.css";
import SocialTab from "./SocialComponents/SocialTab";
import useFirebase from "../../hooks/useFirebase";

function BlogComponent({ blog }) {
  const { user, isVerified } = useFirebase();
  let isLiked = false;
  if (blog.likes?.includes(user.uid)) {
    isLiked = true;
  }

  const containerStyle = {
    display: "flex",
    background: "transparent",
    fontFamily: "Montserrat",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "white",
    maxWidth: "90vw",
    margin: "auto",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  };

  const imageStyle = {
    maxWidth: "75vw",
    maxHeight: "35vh",
    borderRadius: "8px",
    marginRight: "10px",
  };

  const authorInfoStyle = {
    flex: "1",
  };

  const tagsStyle = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
  };

  const tagStyle = {
    backgroundColor: "rgb(0,0,0,0.3)",
    padding: "4px 8px",
    margin: "4px",
    borderRadius: "4px",
  };

  const titleStyle = {
    fontSize: "36px",
    font: "bold",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  return (
    <>
      <div className="outerblog">
        <div className="top" style={containerStyle}>
          <h2 style={titleStyle}>{blog.title}</h2>
          <br />

          <div style={authorInfoStyle}>
            <div style={headerStyle}>
              <p>
                {" "}
                <b>{blog.author}</b>
              </p>
              <p>
                {" "}
                <b>{blog.date}</b>
              </p>
            </div>
            <img src={blog.image} alt={blog.title} style={imageStyle} />
            <div style={tagsStyle}>
              {blog.tags?.map((tag, index) => (
                <span key={index} style={tagStyle}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="horizontal-bar"></div>

          <div
            className="blog-text-data"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        <SocialTab
          likes={blog.likes?.length}
          comments={blog.comments}
          blogId={blog.id}
          user={user}
          isliked={isLiked}
        />
      </div>
    </>
  );
}

export default BlogComponent;
