import React, { useContext } from "react";

//Styles
import styles from "./Dropdown.module.css";

//Context
import { Context } from "../../context/context";

const Dropdown = () => {
  const { sortByKey, sortOrder, setSortOrder, setSortByKey } =
    useContext(Context);

  return (
    <div className={styles["dropdown-box"]}>
      <select
        className={styles["dropdown"]}
        onChange={(e) => {
          setSortByKey(e.target.value);
        }}
      >
        <option selected={sortByKey === "time"} value="time">
          Date Posted
        </option>
        <option selected={sortByKey === "likes"} value="likes">
          Likes
        </option>
      </select>
      <select
        className={styles["dropdown"]}
        onChange={(e) => {
          setSortOrder(e.target.value);
        }}
      >
        <option selected={sortOrder === "asc"} value="asc">
          Low To High
        </option>
        <option selected={sortOrder === "desc"} value="desc">
          High To Low
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
