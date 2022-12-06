import React, { useState } from "react";
import Article from "../article/article";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin, Alert } from "antd";
import { fetchArticles } from "../../store/reducers/actions";

const ArticleList = () => {
  const { articles, articlesCount } = useSelector(
    (state) => state.articleReducer.articles,
  );
  const { isLoading, error } = useSelector((state) => state.articleReducer);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const items =
    articles && !isLoading && !error.length ? (
      articles.map((art, index) => <Article key={index} {...art} />)
    ) : !articles && isLoading && !error.length ? (
      <Spin size="large" />
    ) : (
      <Alert message={error} type="error" showIcon />
    );

  const onChangePage = (e) => {
    console.log(e);
    const offset = e === 1 ? 0 : e * 5 - 5;
    setPage(e);
    dispatch(fetchArticles(offset));
  };

  return (
    <>
      {items}
      <Pagination
        total={articlesCount}
        pageSize={5}
        hideOnSinglePage
        showSizeChanger={false}
        current={page}
        defaultCurrent={1}
        onChange={(e) => onChangePage(e)}
      />
    </>
  );
};
export default ArticleList;
