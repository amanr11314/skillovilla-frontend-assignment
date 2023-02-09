import React, { useContext, useEffect } from "react";
import "../styles/Dropdown.css";

import { Context } from "../context/context";
const Dropdown = () => {
  const { setSortOrder, setSortByKey } = useContext(Context);

  return (
    <div className="dropdown-box">
      <select
        className="dropdown"
        onChange={(e) => {
          setSortByKey(e.target.value);
        }}
      >
        <option value="time">Date Posted</option>
        <option value="likes">Likes</option>
      </select>
      <select
        className="dropdown"
        onChange={(e) => {
          setSortOrder(e.target.value);
        }}
      >
        <option value="asc">Low To High</option>
        <option value="desc">High To Low</option>
      </select>
    </div>
  );
};

export default Dropdown;
