import { useContext, useEffect } from "react";

//Styles
import "./App.css";

//Context
import { Context } from "./context/context";

//Utils
import { loadUser, getComments } from "./utils/api";

//Components
import SignIn from "./components/SignIn/SignIn";
import CommentBox from "./components/CommentBox/CommentBox";
import Comment from "./components/Comment/Comment";
import Dropdown from "./components/Dropdown/Dropdown";
import Toast from "./components/Toast/Toast";

function App() {
  const {
    comments,
    commentsHandler,
    user,
    userHandler,
    sortHandler,
    toastList,
    toastHandler,
  } = useContext(Context);

  const loadComments = () => {
    getComments().then((res) => commentsHandler(res));
  };

  useEffect(() => {
    loadUser()
      .then((data) => {
        userHandler(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getComments().then((res) => commentsHandler(res));
  }, []);

  return (
    <>
      {!user ? (
        <SignIn />
      ) : (
        <div className="root">
          <Toast
            toastlist={toastList}
            position="bottom-right"
            setList={toastHandler}
          />
          <CommentBox refetchReplies={loadComments} />
          <Dropdown />
          {sortHandler(comments)?.map((comment) => {
            return (
              <Comment
                key={comment.id}
                loadComments={loadComments}
                self={user?.id}
                {...comment}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
