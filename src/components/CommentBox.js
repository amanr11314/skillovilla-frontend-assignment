import React from "react";
import Avatar from "./Avatar";
import "../styles/CommentBox.css";

const CommentBox = ({ placeholder = "Join the discussion..." }) => {
  return (
    <div className="join-discussion">
      <Avatar userId={1} />
      <div className="discussion-input">
        <textarea
          maxLength={200}
          rows={1}
          cols={90}
          placeholder="Join the discussion..."
          className="discussion-input-textarea"
        ></textarea>
      </div>
    </div>
  );
};

export default CommentBox;
