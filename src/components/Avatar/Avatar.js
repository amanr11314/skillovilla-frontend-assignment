import React from "react";

//Styles
import styles from "./Avatar.module.css";

const Avatar = ({ userId = 1 }) => {
  return (
    <img
      className={styles.avatar}
      src={`https://i.pravatar.cc/40?img=${userId}`}
      alt="avatar-1"
    />
  );
};

export default Avatar;
