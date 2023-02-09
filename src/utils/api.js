const url = "http://localhost:8080/";

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
    // console.log({ getuserbyid: data });
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
  // console.log({ loaduserid: id });
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
    console.log("body=", body);
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

export const updateComment = async (route, body, id) => {
  try {
    const response = await fetch(url + `${route}/${id}`, {
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

export const delteComment = async (id) => {
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

export const postReplies = async (body) => {
  try {
    const response = await fetch(url + "replies", {
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
