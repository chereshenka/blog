export const userSystemLogin = async (url, email, password) => {
  const token = localStorage.getItem("token");
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      },
    }),
  });
};
