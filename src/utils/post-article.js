

const onSubmit = async (data) => {
  const urlBase = new URL("https://blog.kata.academy/api/articles");
  const token = localStorage.getItem("token");
  const { title, description, body } = data;

  const res = await fetch(urlBase, {
    method: "POST",
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
        tagList: input,
      },
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        setStatusMessage((state) => {
          return {
            ...state,
            message: "Something went wrong",
            success: true,
          };
        });
        res;
      }
      if (res.status === 200) {
        setStatusMessage((state) => {
          return {
            ...state,
            message: "Article published successfull",
            success: true,
          };
        });
      }
    })
    .catch(() => {
      throw new Error(res);
    });
  reset();
};
