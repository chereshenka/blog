export const getFullArticle = async (url, id) => {
  const token = localStorage.getItem("token");

  return await fetch(`${url + id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};
