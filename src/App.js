import "./App.css";
import CommentBox from "./components/CommentBox";
import Comment from "./components/Comment";
import { Context } from "./context/context";
import { useContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import { loadUser, getComments } from "./utils/api";

const obj = {
  id: 1,
  author: {
    userId: 12,
    username: "Clueless-kun",
  },
  created_at: "7 hours ago",
  likes: 4,
  dislikes: 10,
  isMod: false,
  parent: -1,
  content: `The World Wide Fund for Nature (WWF) is an international organization
          working on issues regarding the conservation, research and restoration
          of the environment, formerly named the World Wildlife Fund. WWF was
          founded in 1961.`,
  vote: 0,
  replies: [
    {
      id: 2,
      author: {
        userId: 13,
        username: "Nebuchadnezzer (AFTP)",
      },
      created_at: "7 hours ago",
      likes: 2,
      dislikes: 10,
      isMod: true,
      parent: 1,
      content: `Working on it. It will eventually be linkable on the side of all discussions`,
      vote: 0,
    },
  ],
};

function App() {
  const { comments, commentsHandler, user, userHandler } = useContext(Context);

  console.log(comments);

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
          <CommentBox />
          <Comment obj={obj} />
        </div>
      )}
    </>
  );
}

export default App;
