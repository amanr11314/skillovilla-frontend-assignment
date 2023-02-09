import React from "react";
import "../styles/Avatar.css";

const Avatar = ({ userId = 1 }) => {
  return (
    <img
      className="avatar"
      src={`https://i.pravatar.cc/40?img=${userId}`}
      alt="avatar-1"
    />
  );
};

export default Avatar;
