import React, { useContext, useState } from "react";

//Styles
import styles from "./SignIn.module.css";

//Context
import { Context } from "../../context/context";

//Utils
import { logInUser } from "../../utils/api";

const initialState = {
  username: "",
  likes: [],
  dislikes: [],
};

const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const { userHandler } = useContext(Context);

  const onChangeUsername = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    logInUser(formData)
      .then((res) => {
        userHandler(res);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={styles["container"]}>
      <h2>Enter username to proceed</h2>
      <form className={styles["form-box"]} onSubmit={handleSignIn}>
        <input
          className={styles["form-box-input"]}
          type="text"
          name="username"
          required
          placeholder="Username"
          onChange={onChangeUsername}
          value={formData?.username}
        />
        <button className={styles["form-box-btn-submit"]} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
