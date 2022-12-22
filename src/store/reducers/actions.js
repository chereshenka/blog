import { articleSlice } from "./articles-reducer";
import { userDataLogin } from "./user-state";
import { singleArticleSlice } from "./single-article-reducer";

const urlBase = new URL("https://blog.kata.academy/api/");
export const token = localStorage.getItem("token");

export const fetchArticlesGlobal =
  (page = 1) =>
  async (dispatch) => {
    const articleUrl = new URL("articles?", urlBase);
    const params = new URLSearchParams({
      offset: page,
      limit: 5,
    });
    try {
      dispatch(articleSlice.actions.fetchArticles());
      const response = await fetch(articleUrl + params, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => res.json());
      dispatch(
        articleSlice.actions.fetchArticlesSuccess({
          data: response,
        }),
      );
    } catch (e) {
      dispatch(articleSlice.actions.fetchArticlesError(e.message));
    }
  };

export const fetchSingle = (slug) => async (dispatch) => {
  const singlePage = new URL(`articles/${slug}`, urlBase);
  try {
    dispatch(singleArticleSlice.actions.fetchSingle());
    const response = await fetch(singlePage, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json());
    dispatch(singleArticleSlice.actions.fetchSingleSuccess(response));
  } catch (e) {
    dispatch(singleArticleSlice.actions.fetchSingleError(e.message));
  }
};

export const checkUserLogin = () => async (dispatch) => {
  const user = new URL("user", urlBase);
  try {
    await fetch(user, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) =>
        dispatch(
          userDataLogin.actions.userLoggined({
            isLoggedIn: true,
            user: json.user,
          }),
        ),
      );
  } catch (e) {
    throw new Error("Authorization failed");
  }
};

export const loginUser = (state) => (dispatch) => {
  dispatch(userDataLogin.actions.userLoggined(state));
};
