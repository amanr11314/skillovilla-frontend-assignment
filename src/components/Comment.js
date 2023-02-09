import React, { useState, useEffect, useMemo } from "react";
import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import "../styles/Comment.css";
import {
  getUserById,
  getComments,
  getReplies,
  delteComment,
} from "../utils/api";

const Comment = (props) => {
  const {
    id,
    content,
    userId,
    time,
    likes,
    dislikes,
    parent,
    isMod,
    isReply,
    replyTo,
    self,
    loadComments,
  } = props;

  const isSelf = userId === self;

  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  const [vote, setVote] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [author, setAuthor] = useState();
  const [replies, setReplies] = useState([]);

  const refetchReplies = async () => {
    let query = new URLSearchParams({ parent: id });
    try {
      const res = await getReplies(query);
      setReplies(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickReply = () => {
    setShowReply(!showReply);
  };

  const onClickDelete = (e) => {
    delteComment(id).then(() => {
      if (parent === -1) {
        props?.loadComments?.();
      } else {
        props?.refetchParentReplies?.();
      }
    });
  };

  useEffect(() => {
    let active = true;
    loadAuthor();
    return () => {
      active = false;
    };

    async function loadAuthor() {
      try {
        const res = await getUserById(userId);
        if (!active) {
          return;
        }
        setAuthor(res);
      } catch (err) {
        console.log(err);
      }
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    loadReplies();
    return () => {
      active = false;
    };

    async function loadReplies() {
      let query = new URLSearchParams({ parent: id });
      try {
        const res = await getReplies(query);
        if (!active) {
          return;
        }
        if (res.length > 0) {
          setReplies(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  return (
    <div key={id} className="comment">
      <Avatar userId={userId} />
      <div>
        <div className="comment-header">
          <div className="comment-header-username">{author?.username}</div>
          {isReply ? (
            <div className="comment-header-reply-to">
              <span class="material-symbols-outlined">google_plus_reshare</span>
              {replyTo?.username}
            </div>
          ) : null}
          &#x2022;
          <div className="timestamp">{time}</div>
        </div>
        <p className="comment-content">{content}</p>
        <div className="comment-footer">
          {likes ? <span>{likes}</span> : null}
          <span
            class="material-symbols-outlined toolbar-action"
            style={{
              fontWeight: vote === 1 ? "bold" : "normal",
              color: vote === 1 ? "black" : "grey",
            }}
          >
            expand_less
          </span>
          <span>&nbsp;|&nbsp;</span>
          {dislikes ? <span>{`-${dislikes}`}</span> : null}
          <span
            class="material-symbols-outlined toolbar-action"
            style={{
              fontWeight: vote === -1 ? "bold" : "normal",
              color: vote === -1 ? "red" : "grey",
            }}
          >
            expand_more
          </span>
          &#x2022; &nbsp;
          <span className="toolbar-action" onClick={onClickReply}>
            Reply
          </span>
          &nbsp; &#x2022; &nbsp;
          {isSelf ? (
            <>
              <span className="toolbar-action">Edit</span>
              &nbsp; &#x2022; &nbsp;
              <span className="toolbar-action" onClick={onClickDelete}>
                Delete
              </span>
              &nbsp; &#x2022;
            </>
          ) : null}
        </div>
        {/* Conditionally render reply box */}
        {showReply ? (
          <CommentBox
            placeholder={`Reply to ${author?.username}`}
            isReply={true}
            parent={id}
            refetchReplies={refetchReplies}
            setShowReply={setShowReply}
            setReplies={setReplies}
          />
        ) : null}
        {/* Render replies */}
        {replies?.map((reply) => {
          return (
            <Comment
              key={reply?.id}
              isReply={true}
              replyTo={author}
              self={self}
              loadComments={loadComments}
              setParentReplies={setReplies}
              refetchParentReplies={refetchReplies}
              {...reply}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
