import React, { useState } from "react";
import Article from "../../components/article/article";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin, Alert } from "antd";
import { fetchArticlesGlobal } from "../../store/reducers/actions";

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
    const offset = e === 1 ? 0 : e * 5 - 5;
    setPage(e);
    dispatch(fetchArticlesGlobal(offset));
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
