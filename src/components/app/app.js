import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import ArticleList from "../../pages/article-list/article-list";
import {
  checkUserLogin,
  fetchArticlesGlobal,
  token,
} from "../../store/reducers/actions";
import Layout from "../layout/layout";
import SinglePage from "../../pages/single-page-article/single-page";
import EnterPage from "../../pages/enter-page/enter-page";
import RegistrationPage from "../../pages/registration-page/registration-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import NewArticle from "../../pages/new-article/new-article";
import RequireAuth from "../../hoc/RequireAuth";
import ArticleChange from "../../pages/article-edit/article-edit";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticlesGlobal());
    userDataFetch();
  }, []);

  const userDataFetch = () => {
    if (token) {
      dispatch(checkUserLogin());
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="/articles/:id" element={<SinglePage />} />
          <Route path="/sing-in" element={<EnterPage />} />
          <Route path="/sing-up" element={<RegistrationPage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <NewArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/articles/:id/edit"
            element={
              <RequireAuth>
                <ArticleChange />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
