export const userSystemLogin = async (url, email, password) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      },
    }),
  });
};
