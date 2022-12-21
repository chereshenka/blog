import { token } from "../store/reducers/actions";

export const changeUserData = async (url, username, email, password, image) => {
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
        username: username,
        image: image,
      },
    }),
  });
};
