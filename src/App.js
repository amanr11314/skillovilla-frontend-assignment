import "./App.css";
import CommentBox from "./components/CommentBox";
import Comment from "./components/Comment";
import { Context } from "./context/context";
import { useContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import { loadUser, getComments } from "./utils/api";
import Dropdown from "./components/Dropdown";

function App() {
  const { comments, commentsHandler, user, userHandler, sortHandler } =
    useContext(Context);

  console.log(comments);

  const loadComments = () => {
    getComments().then((res) => commentsHandler(res));
  };

  useEffect(() => {
    console.log("called loaduser");
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
