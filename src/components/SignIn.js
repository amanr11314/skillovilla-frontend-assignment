import React, { useContext, useState } from "react";
import { Context } from "../context/context";
import { logInUser } from "../utils/api";
import "../styles/SignIn.css";

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
    <div className="container">
      <h2>Enter username to proceed</h2>
      <form className="form-box" onSubmit={handleSignIn}>
        <input
          className="form-box-input"
          type="text"
          name="username"
          required
          placeholder="Username"
          onChange={onChangeUsername}
          value={formData?.username}
        />
        <button className="form-box-btn-submit" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
