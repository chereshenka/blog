export const favotiteOptions = async (url, id, method) => {
  const token = localStorage.getItem("token");
  return await fetch(url + `/${id}/favorite`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};
