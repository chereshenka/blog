import React, { useEffect } from "react";
import styles from "./single-page.module.scss";
import { useDispatch, useSelector } from "react-redux/es";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { fetchSingle } from "../../store/reducers/actions";
import ReactMarkdown from "react-markdown";

const SinglePage = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("fetching this shit");
    dispatch(fetchSingle(id));
  }, [id]);

  const { article } = useSelector((state) => state.singleReducer.article);

  return (
    <>
      {article ? (
        <div key={article.slug} className={styles.body}>
          <div className={styles.article}>
            <div className={styles.article_header}>
              <div id={article.slug} className={styles.article_title}>
                {article.title}
              </div>
              <div className={styles.article_likes}>
                {article.favoritesCount}
              </div>
            </div>
            <div className={styles.article_tags}>
              {article.tagList
                ? article.tagList.map((tag, index) =>
                    tag ? (
                      <div key={index}>
                        <span className={styles.article_tag}>
                          {String(tag).length > 10
                            ? tag.split(" ").slice(0, 1)
                            : tag}
                        </span>
                      </div>
                    ) : null,
                  )
                : null}
            </div>
            <div className={styles.article_text}>
              <ReactMarkdown>{article.description}</ReactMarkdown>
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.user_info}>
              <p className={styles.user_name}>{article.author.username}</p>
              <p className={styles.user_date}>
                {format(parseISO(article.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
            <div>
              <img
                className={styles.user_avatar}
                src={article.author.image}
                alt="avatar"
              />
            </div>
          </div>
        </div>
      ) : (
        "object wasnt get"
      )}
    </>
  );
};

export default SinglePage;
