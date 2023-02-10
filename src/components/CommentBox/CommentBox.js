import React, { useContext, useState, useRef } from "react";

//Styles
import styles from "./CommentBox.module.css";

//Context
import { Context } from "../../context/context";

//Utils
import moment from "moment/moment";
import _ from "lodash";
import { postComment } from "../../utils/api";

//Components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";

const CommentBox = (props) => {
  const {
    placeholder = "Join the discussion...",
    isReply,
    parent,
    refetchReplies,
    setShowReply,
  } = props;
  const { user, showToast } = useContext(Context);
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
        showToast({
          type: "success",
          title: isReply ? "Reply" : "Post",
          description: isReply
            ? `You replied to ${props?.replyTo?.username}!`
            : "You commented!",
        });
        refetchReplies();
      })
      .catch((err) => {
        showToast({
          type: "danger",
          title: "Error",
          description: "Something went wrong!",
        });
      })
      .finally(() => {
        clearContent();
      });
  };

  const onCancelComment = () => {
    clearContent();
  };

  return (
    <div className={styles["join-discussion"]}>
      <Avatar userId={user.id} />
      <div>
        <div className={styles["discussion-input"]}>
          <textarea
            maxLength={200}
            rows={1}
            cols={90}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className={styles["discussion-input-textarea"]}
            ref={inputRef}
          ></textarea>
        </div>
        <div className={styles["user-actions"]}>
          <Button type="primary" onClick={onPostComment}>
            {isReply ? "Reply" : "Post"}
          </Button>
          <Button type="secondary" onClick={onCancelComment}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
