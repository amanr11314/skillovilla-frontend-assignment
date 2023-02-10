import _ from "lodash";
const url = "https://hollow-leaf-gate.glitch.me/";

export const getComments = async () => {
  try {
    const response = await fetch(url + "comments?parent=-1");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getCommentById = async (id) => {
  try {
    const response = await fetch(url + `comments/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(url + `user/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getReplies = async (searchParam) => {
  try {
    const response = await fetch(
      url + `comments?` + new URLSearchParams(searchParam)
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const loadUser = async () => {
  const id = localStorage.getItem("id");
  if (!id) return;
  try {
    const response = await getUserById(id);
    const data = response;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const logInUser = async (body) => {
  try {
    const response = await fetch(url + `user?username=${body?.username}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.length > 0) {
      localStorage.setItem("id", data[0]?.id);
      return data[0];
    }
  } catch (err) {
    console.log(err.message);
  }

  try {
    const response = await fetch(url + "user", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("id", data.id);
    return data;
  } catch (err) {}
};

export const postComment = async (body) => {
  try {
    const response = await fetch(url + "comments", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const updateComment = async (body, id) => {
  try {
    const response = await fetch(url + `comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const toggleLikeonComment = async (body, id) => {
  const comment = await getCommentById(id);
  const { likes, dislikes } = comment;
  const { user } = body;
  if (!user) return;
  const hasLiked = _.find(likes, (like) => like === user);
  let newLikes = [];
  let newDislikes = dislikes;
  if (hasLiked) {
    // has liked -> user exists in liked list
    newLikes = _.filter(likes, (like) => like !== user);
  } else {
    // has not liked -> user does not exists in liked list
    newLikes = [...likes, user];
    newDislikes = _.filter(dislikes, (dislike) => dislike !== user);
  }

  const body_obj = {
    likes: newLikes,
    dislikes: newDislikes,
  };

  try {
    const response = await fetch(url + `comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body_obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const toggleDislikeonComment = async (body, id) => {
  const comment = await getCommentById(id);
  const { likes, dislikes } = comment;
  const { user } = body;

  if (!user) return;
  const hasDisliked = _.find(dislikes, (dislike) => dislike === user);

  let newLikes = likes;
  let newDislikes = [];

  if (hasDisliked) {
    // has disliked -> user exists in disliked list
    newDislikes = _.filter(dislikes, (dislike) => dislike !== user);
  } else {
    // has not disliked -> user does not exists in disliked list
    newDislikes = [...dislikes, user];
    newLikes = _.filter(likes, (like) => like !== user);
  }

  const body_obj = {
    likes: newLikes,
    dislikes: newDislikes,
  };

  try {
    const response = await fetch(url + `comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body_obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await fetch(url + `comments/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
