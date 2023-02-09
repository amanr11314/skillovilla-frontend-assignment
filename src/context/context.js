import React, { useState } from "react";
import { orderBy } from "lodash";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [sortByKey, setSortByKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const userHandler = (newUser) => {
    setUser(newUser);
  };

  const commentsHandler = (newComments) => {
    setComments((prev) => newComments);
  };

  const sortHandler = (newComments) => {
    console.log({ newComments, sortByKey, sortOrder });
    if (!sortByKey || !sortOrder) return newComments;
    const result = orderBy(newComments, sortByKey, sortOrder);
    return result;
  };

  const initialState = {
    comments,
    commentsHandler,
    user,
    userHandler,
    edit,
    setEdit,
    editContent,
    setEditContent,
    sortOrder,
    setSortOrder,
    sortByKey,
    setSortByKey,
    sortHandler,
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
