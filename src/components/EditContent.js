import React, { useContext } from "react";
import "../styles/EditContent.css";
import "../styles/Button.css";
import { Context } from "../context/context";
import { updateComment } from "../utils/api";
import moment from "moment/moment";
import _ from "lodash";

const EditContent = (props) => {
  const { edit, setEdit, editContent, setEditContent } = useContext(Context);

  const { refetch } = props;

  const onEditComment = (e) => {
    setEditContent(e.target.value);
  };

  const hideEdit = () => {
    setEdit(null);
    setEditContent("");
  };

  const onUpdateComment = () => {
    if (_.isEmpty(editContent)) return;
    const body = {
      content: editContent,
      time: moment().format(),
    };
    updateComment(body, edit)
      .then(() => {
        refetch();
      })
      .finally(() => {
        hideEdit();
      });
  };

  const onCancelEdit = () => {
    hideEdit();
  };

  return (
    <div>
      <div className="edit-content">
        <textarea
          onChange={onEditComment}
          value={editContent}
          maxLength={200}
          rows={1}
          cols={90}
          placeholder="Edit comment"
          className="edit-content-input-textarea"
        ></textarea>
      </div>
      <div className="user-actions">
        <button className="button button-primary" onClick={onUpdateComment}>
          Update
        </button>
        <button className="button button-secondary" onClick={onCancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditContent;
