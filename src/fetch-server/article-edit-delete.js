export const fetchEditDeleteArticle = async (data, url, method, tagArray) => {
  const token = localStorage.getItem("token");
  const { title, description, body } = data;

  return await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagArray,
      },
    }),
  });
};
