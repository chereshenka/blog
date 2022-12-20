import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin, Alert } from "antd";

import Article from "../../components/article/article";
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
      <>
        {articles.map((art, index) => (
          <Article key={index} {...art} />
        ))}
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
    ) : null;
  const loading =
    !articles && isLoading && !error ? <Spin size="large" /> : null;
  const alertInfo =
    !articles && !isLoading && error.length ? (
      <Alert
        message="Something went wrong, try another request"
        type="error"
        showIcon
      />
    ) : null;

  const onChangePage = (e) => {
    const offset = e === 1 ? 0 : e * 5 - 5;
    setPage(e);
    dispatch(fetchArticlesGlobal(offset));
  };

  return (
    <>
      {items}
      {loading}
      {alertInfo}
    </>
  );
};
export default ArticleList;
