import { token } from "../store/reducers/actions";

export const getFullArticle = async (url, id) => {
  return await fetch(`${url + id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};
