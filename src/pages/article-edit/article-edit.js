import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { useParams } from "react-router";

import ArticleEditor from "../../components/article-editor/article-editor";
import { fetchSingle } from "../../store/reducers/actions";

const ArticleChange = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingle(id));
  }, [id]);

  const { article } = useSelector((state) => state.singleReducer.article);

  return (
    <>
      <ArticleEditor title="Edit article" data={article} />
    </>
  );
};

export default ArticleChange;
