import React, { useContext, useState, useRef } from "react";
import Avatar from "./Avatar";
import "../styles/CommentBox.css";
import "../styles/Button.css";
import { Context } from "../context/context";
import { postComment } from "../utils/api";
import moment from "moment/moment";
import _ from "lodash";

const CommentBox = (props) => {
  const {
    placeholder = "Join the discussion...",
    isReply,
    parent,
    refetchReplies,
    setShowReply,
  } = props;
  const { user } = useContext(Context);
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  const clearContent = () => {
    setContent("");
    if (inputRef?.current) inputRef.current.value = "";
    if (isReply) setShowReply(false);
  };

  const onPostComment = () => {
    if (_.isEmpty(content)) return;
    const comment = {
      content,
      userId: user.id,
      time: moment().format(),
      likes: [],
      dislikes: [],
      parent: isReply ? parent : -1,
      isMod: false,
    };
    postComment(comment)
      .then((_) => {
        refetchReplies();
      })
      .finally(() => {
        clearContent();
      });
  };

  const onCancelComment = () => {
    clearContent();
  };

  return (
    <div className="join-discussion">
      <Avatar userId={user.id} />
      <div>
        <div className="discussion-input">
          <textarea
            maxLength={200}
            rows={1}
            cols={90}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="discussion-input-textarea"
            ref={inputRef}
          ></textarea>
        </div>
        <div className="user-actions">
          <button className="button button-primary" onClick={onPostComment}>
            {isReply ? "Reply" : "Post"}
          </button>
          <button className="button button-secondary" onClick={onCancelComment}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
