import React, { useState } from "react";
import { orderBy, size } from "lodash";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [sortByKey, setSortByKey] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");
  const [toastList, setToastList] = useState([]);

  const userHandler = (newUser) => {
    setUser(newUser);
  };

  const commentsHandler = (newComments) => {
    setComments((prev) => newComments);
  };

  const sortHandler = (newComments) => {
    if (!sortByKey || !sortOrder) return newComments;
    if (sortByKey === "likes") {
      const result = orderBy(
        newComments,
        [(comment) => size(comment?.likes)],
        sortOrder
      );
      return result;
    }
    const result = orderBy(newComments, sortByKey, sortOrder);
    return result;
  };

  const toastHandler = (newToasts) => {
    setToastList((prev) => newToasts);
  };

  const showToast = ({ type, title, description }) => {
    let toastProperties = null;
    switch (type) {
      case "success":
        toastProperties = {
          id: toastList.length + 1,
          title,
          description,
          backgroundColor: "#5cb85c",
        };
        break;
      case "danger":
        toastProperties = {
          id: toastList.length + 1,
          title,
          description,
          backgroundColor: "#d9534f",
        };
        break;
      case "info":
        toastProperties = {
          id: toastList.length + 1,
          title,
          description,
          backgroundColor: "#5bc0de",
        };
        break;
      case "warning":
        toastProperties = {
          id: toastList.length + 1,
          title,
          description,
          backgroundColor: "#f0ad4e",
        };
        break;
      default:
        toastProperties = [];
    }
    const newlist = [...toastList, toastProperties];
    toastHandler(newlist);
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
    toastHandler,
    toastList,
    showToast,
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
