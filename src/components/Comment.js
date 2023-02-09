import React, { useState, useEffect, useContext, useMemo } from "react";
import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import "../styles/Comment.css";
import {
  getUserById,
  getReplies,
  deleteComment,
  toggleLikeonComment,
  toggleDislikeonComment,
} from "../utils/api";
import { Context } from "../context/context";
import EditContent from "./EditContent";
import moment from "moment";
import _ from "lodash";

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
  const hasLiked = _.find(likes, (user) => user === self);
  const hasDisliked = _.find(dislikes, (user) => user === self);

  const { edit, setEdit, setEditContent, sortHandler } = useContext(Context);
  // const [edit, setEdit] = useState(false);
  // const [editContent, setEditContent] = useState("");

  const refetchReplies = async () => {
    let query = new URLSearchParams({ parent: id });
    try {
      const res = await getReplies(query);
      setReplies(res);
    } catch (err) {
      console.log(err);
    }
  };

  const refetchCustomParent = () => {
    if (parent === -1) {
      props?.loadComments?.();
    } else {
      props?.refetchParentReplies?.();
    }
  };

  const onClickReply = () => {
    setShowReply(!showReply);
  };

  const onClickDelete = (e) => {
    deleteComment(id).then(() => {
      refetchCustomParent();
    });
  };

  const onCommentLike = () => {
    toggleLikeonComment({ user: self }, id).then(() => {
      refetchCustomParent();
    });
  };
  const onCommentDislike = () => {
    toggleDislikeonComment({ user: self }, id).then(() => {
      refetchCustomParent();
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

  const onClickEdit = () => {
    setEditContent(content);
    setEdit(id);
  };

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
          <div className="timestamp">{moment(time).fromNow()}</div>
        </div>
        {edit === id ? (
          <EditContent refetch={refetchCustomParent} />
        ) : (
          <p className="comment-content">{content}</p>
        )}
        {edit === id ? null : (
          <div className="comment-footer">
            {likes?.length !== 0 ? <span>{likes?.length}</span> : null}
            <span
              class="material-symbols-outlined toolbar-action"
              style={{
                fontWeight: hasLiked ? "bold" : "normal",
                color: hasLiked ? "black" : "grey",
              }}
              onClick={onCommentLike}
            >
              expand_less
            </span>
            <span>&nbsp;|&nbsp;</span>
            {dislikes?.length !== 0 ? (
              <span>{`-${dislikes?.length}`}</span>
            ) : null}
            <span
              class="material-symbols-outlined toolbar-action"
              style={{
                fontWeight: hasDisliked ? "bold" : "normal",
                color: hasDisliked ? "red" : "grey",
              }}
              onClick={onCommentDislike}
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
                <span className="toolbar-action" onClick={onClickEdit}>
                  Edit
                </span>
                &nbsp; &#x2022; &nbsp;
                <span className="toolbar-action" onClick={onClickDelete}>
                  Delete
                </span>
                &nbsp; &#x2022;
              </>
            ) : null}
          </div>
        )}
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
        {sortHandler(replies)?.map((reply) => {
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
