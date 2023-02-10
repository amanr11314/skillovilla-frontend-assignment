import React from "react";

//Styles
import styles from "./Button.module.css";

const Button = (props) => {
  const { type, onClick, children } = props;
  return (
    <button
      className={`${styles["button"]} ${styles[type || "primary"]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
