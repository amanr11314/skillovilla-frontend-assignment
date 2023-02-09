import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");

  const userHandler = (newUser) => {
    setUser(newUser);
  };

  const commentsHandler = (newComments) => {
    setComments((prev) => newComments);
  };

  const replyHandler = (newReply) => {
    setReply((prev) => newReply);
  };

  const initialState = {
    comments,
    commentsHandler,
    user,
    userHandler,
    reply,
    replyHandler,
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
