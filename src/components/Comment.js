import React, { useState } from "react";
import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import "../styles/Comment.css";

const Comment = (props) => {
  const { obj, isReply, replyTo } = props;
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [vote, setVote] = useState(0);

  const [showReply, setShowReply] = useState(false);

  const onClickReply = () => {
    setShowReply(!showReply);
    // const placeHolder = `Reply to ${replyTo?.username}`
  };

  return (
    <div key={obj?.id} className="comment">
      <Avatar userId={obj?.author.userId} />
      <div>
        <div className="comment-header">
          <div className="comment-header-username">{obj?.author?.username}</div>
          {isReply ? (
            <div className="comment-header-reply-to">
              <span class="material-symbols-outlined">google_plus_reshare</span>
              {replyTo?.username}
            </div>
          ) : null}
          &#x2022;
          <div className="timestamp">{obj.created_at}</div>
        </div>
        <p className="comment-content">{obj?.content}</p>
        <div className="comment-footer">
          {obj?.likes ? <span>{obj?.likes}</span> : null}
          <span
            class="material-symbols-outlined toolbar-action"
            style={{
              fontWeight: obj?.vote === 1 ? "bold" : "normal",
              color: obj?.vote === 1 ? "black" : "grey",
            }}
          >
            expand_less
          </span>
          <span>&nbsp;|&nbsp;</span>
          {obj?.dislikes ? <span>{`-${obj?.dislikes}`}</span> : null}
          <span
            class="material-symbols-outlined toolbar-action"
            style={{
              fontWeight: obj?.vote === -1 ? "bold" : "normal",
              color: obj?.vote === -1 ? "red" : "grey",
            }}
          >
            expand_more
          </span>
          &#x2022; &nbsp;
          <span className="toolbar-action" onClick={onClickReply}>
            Reply
          </span>
          &nbsp; &#x2022; &nbsp;
          <span className="toolbar-action">Edit</span>
          &nbsp; &#x2022; &nbsp;
          <span className="toolbar-action">Delete</span>
          &nbsp; &#x2022;
        </div>
        {/* Conditionally render reply box */}
        {showReply ? (
          <CommentBox placeholder={`Reply to ${replyTo?.username}`} />
        ) : null}
        {/* Render replies */}
        {obj?.replies?.map((reply) => {
          return (
            <Comment
              key={reply?.id}
              obj={reply}
              isReply={true}
              replyTo={obj?.author}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
