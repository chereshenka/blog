export const userDataFetch = async (url, username, email, password) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        email: email,
        password: password,
        image: "",
      },
    }),
  });
};
