import React, { useState, useEffect, useContext } from "react";

//Styles
import styles from "./Comment.module.css";

//Context
import { Context } from "../../context/context";

//Utils
import moment from "moment";
import _ from "lodash";
import {
  getUserById,
  getReplies,
  deleteComment,
  toggleLikeonComment,
  toggleDislikeonComment,
} from "../../utils/api";

//Components
import Avatar from "../Avatar/Avatar";
import CommentBox from "../CommentBox/CommentBox";
import EditContent from "../EditContent/EditContent";

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

  const [showReply, setShowReply] = useState(false);
  const [author, setAuthor] = useState();
  const [replies, setReplies] = useState([]);
  const hasLiked = _.find(likes, (user) => user === self);
  const hasDisliked = _.find(dislikes, (user) => user === self);

  const { edit, setEdit, setEditContent, sortHandler, showToast } =
    useContext(Context);

  /* to refetch all replies under this comment */
  const refetchReplies = async () => {
    let query = new URLSearchParams({ parent: id });
    try {
      const res = await getReplies(query);
      setReplies(res);
    } catch (err) {
      console.log(err);
    }
  };

  /* to refetch all replies of this comment's parent; in case of root load all comments */
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

  const onClickEdit = () => {
    setEditContent(content);
    setEdit(id);
  };

  const onClickDelete = (e) => {
    deleteComment(id)
      .then(() => {
        showToast({
          type: "danger",
          title: "Deleted",
          description: `${isReply ? "Reply" : "Comment"} Deleted!`,
        });
        refetchCustomParent();
      })
      .catch((err) => {
        showToast({
          type: "danger",
          title: "Error",
          description: "Something went wrong!",
        });
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

  return (
    <div key={id} className={styles["comment"]}>
      <Avatar userId={userId} />
      <div>
        <div className={styles["comment-header"]}>
          <div className={styles["comment-header-username"]}>
            {author?.username}
          </div>
          {isReply ? (
            <div className={styles["comment-header-reply-to"]}>
              <span className="material-symbols-outlined">
                google_plus_reshare
              </span>
              {replyTo?.username}
            </div>
          ) : null}
          &#x2022;
          <div className={styles["timestamp"]}>{moment(time).fromNow()}</div>
        </div>
        {edit === id ? (
          <EditContent refetch={refetchCustomParent} />
        ) : (
          <p className={styles["comment-content"]}>{content}</p>
        )}
        {edit === id ? null : (
          <div className={styles["comment-footer"]}>
            {likes?.length !== 0 ? <span>{likes?.length}</span> : null}
            <span
              className={`material-symbols-outlined ${styles["toolbar-action"]}`}
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
              className={`material-symbols-outlined ${styles["toolbar-action"]}`}
              style={{
                fontWeight: hasDisliked ? "bold" : "normal",
                color: hasDisliked ? "red" : "grey",
              }}
              onClick={onCommentDislike}
            >
              expand_more
            </span>
            &#x2022; &nbsp;
            <span className={styles["toolbar-action"]} onClick={onClickReply}>
              Reply
            </span>
            &nbsp; &#x2022; &nbsp;
            {isSelf ? (
              <>
                <span
                  className={styles["toolbar-action"]}
                  onClick={onClickEdit}
                >
                  Edit
                </span>
                &nbsp; &#x2022; &nbsp;
                <span
                  className={styles["toolbar-action"]}
                  onClick={onClickDelete}
                >
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
            replyTo={author?.username}
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
