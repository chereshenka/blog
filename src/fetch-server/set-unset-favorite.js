import { token } from "../store/reducers/actions";

export const favotiteOptions = async (url, id, method) => {
  return await fetch(url + `/${id}/favorite`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};
