import React, { useContext } from "react";
import Avatar from "./Avatar";
import "../styles/CommentBox.css";
import { Context } from "../context/context";
import { postComment } from "../utils/api";

const CommentBox = (props) => {
  const {
    placeholder = "Join the discussion...",
    isReply,
    parent,
    refetchReplies,
    setShowReply,
  } = props;
  const { user } = useContext(Context);

  const onPostComment = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if (isReply) setShowReply(false);
      const comment = {
        content: e.target.value,
        userId: user.id,
        time: 7,
        likes: 0,
        dislikes: 0,
        parent: isReply ? parent : -1,
        isMod: false,
      };
      postComment(comment).then((res) => {
        e.target.value = "";
        refetchReplies();
      });
    }
  };

  return (
    <div className="join-discussion">
      <Avatar userId={user.id} />
      <div className="discussion-input">
        <textarea
          onKeyUp={onPostComment}
          maxLength={200}
          rows={1}
          cols={90}
          placeholder={placeholder}
          className="discussion-input-textarea"
        ></textarea>
      </div>
    </div>
  );
};

export default CommentBox;
