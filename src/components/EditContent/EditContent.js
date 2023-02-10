import React, { useContext } from "react";

//Styles
import styles from "./EditContent.module.css";

//Context
import { Context } from "../../context/context";

//Utils
import moment from "moment/moment";
import _ from "lodash";
import { updateComment } from "../../utils/api";

//Components
import Button from "../Button/Button";

const EditContent = (props) => {
  const { edit, setEdit, editContent, setEditContent, showToast } =
    useContext(Context);

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
        showToast({
          type: "info",
          title: "Edit",
          description: "Comment Updated!",
        });
        refetch();
      })
      .catch((err) => {
        showToast({
          type: "danger",
          title: "Error",
          description: "Something went wrong!",
        });
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
      <div className={styles["edit-content"]}>
        <textarea
          onChange={onEditComment}
          value={editContent}
          maxLength={200}
          rows={1}
          cols={90}
          placeholder="Edit comment"
          className={styles["edit-content-input-textarea"]}
        ></textarea>
      </div>
      <div className={styles["user-actions"]}>
        <Button type="primary" onClick={onUpdateComment}>
          Update
        </Button>
        <Button type="secondary" onClick={onCancelEdit}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditContent;
