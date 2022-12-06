import axios from "axios";
import { articleSlice } from "./articles-reducer";
import { singleArticleSlice } from "./single-article-reducer";

const urlBase = new URL("https://blog.kata.academy/api/");

export const fetchArticles = (page) => async (dispatch) => {
  console.log("fetch list of articles", page);
  const articleUrl = new URL("articles?", urlBase);
  const params = new URLSearchParams({
    offset: page || 0,
    limit: 5,
  });
  try {
    dispatch(articleSlice.actions.fetchArticles());
    const response = await axios.get(articleUrl + params);
    console.log("fetch list response>>>>", response);
    dispatch(articleSlice.actions.fetchArticlesSuccess(response.data));
  } catch (e) {
    dispatch(articleSlice.actions.fetchArticlesError(e.message));
  }
};

export const fetchSingle = (slug) => async (dispatch) => {
  console.log("fetch single page", slug);
  const singlePage = new URL(`articles/${slug}`, urlBase);
  try {
    dispatch(singleArticleSlice.actions.fetchSingle());
    const response = await axios.get(singlePage);
    console.log("fetch single response>>>>", response);
    dispatch(singleArticleSlice.actions.fetchSingleSuccess(response.data));
  } catch (e) {
    dispatch(singleArticleSlice.actions.fetchSingleError(e.message));
  }
};
