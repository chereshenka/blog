import React, { useEffect } from "react";
import ArticleList from "../article-list/article-list";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../../store/reducers/actions";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import SinglePage from "../single-page-article/single-page";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="/articles/:id" element={<SinglePage />} />
        </Route>
      </Routes>
    </>
  );
}
