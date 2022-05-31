import React, { forwardRef } from "react";
import "./Post.css";
import ReactRoundedImage from "react-rounded-image";
import DeleteIcon from "@material-ui/icons/Delete";

const Post = forwardRef(({ displayName, text, personal, onClick }, ref) => {
  return (
    <div className="post" ref={ref}>
      <div className="post__avatar">
        <ReactRoundedImage
          image={"https://cdn-icons-png.flaticon.com/512/147/147144.png"}
          roundedColor="#321124"
          imageWidth="100"
          imageHeight="100"
          roundedSize="13"
          borderRadius="70"
        />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{displayName} </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post__footer">
          {personal ? <DeleteIcon fontSize="small" onClick={onClick} /> : ""}
        </div>
      </div>
    </div>
  );
});

export default Post;
