import React, { useContext } from "react";
import "../styles/EditContent.css";
import { Context } from "../context/context";
import { updateComment } from "../utils/api";
import moment from "moment/moment";

const EditContent = (props) => {
  const { edit, setEdit, editContent, setEditContent } = useContext(Context);

  const { refetch } = props;

  const onEditComment = (e) => {
    setEditContent(e.target.value);
  };

  const handleUpdateComment = (e) => {
    const key = e.key;
    if (key === "Enter") {
      const body = {
        content: editContent,
        time: moment().format(),
      };
      updateComment(body, edit).then(() => {
        setEdit(null);
        setEditContent("");
        refetch();
      });
    }
  };

  return (
    <div className="edit-content">
      <textarea
        onKeyUp={handleUpdateComment}
        onChange={onEditComment}
        value={editContent}
        maxLength={200}
        rows={1}
        cols={90}
        placeholder="Edit comment"
        className="edit-content-input-textarea"
      ></textarea>
    </div>
  );
};

export default EditContent;
