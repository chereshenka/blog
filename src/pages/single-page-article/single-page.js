import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Alert, Spin } from "antd";

import avatar from "../../img/avatar.png";
import { fetchSingle, fetchArticlesGlobal } from "../../store/reducers/actions";
import Follow from "../../components/follow/follow";
import Vector from "../../img/Vector.svg";

import styles from "./single-page.module.scss";

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const push = useNavigate();
  useEffect(() => {
    dispatch(fetchSingle(id));
  }, [id]);

  const { article } = useSelector((state) => state.singleReducer.article);
  const { isLoading, error } = useSelector((state) => state.singleReducer);
  const { isLoggedIn, user } = useSelector((state) => state.loginReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const editArticle = () => {
    push(`/articles/${id}/edit`);
  };
  const [imageError, setImageError] = useState(false);

  const deleteArticle = async () => {
    const urlBase = new URL("https://blog.kata.academy/api/articles/");
    const token = localStorage.getItem("token");

    await fetch(`${urlBase + id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((data) => {
        if (data.ok) {
          dispatch(fetchArticlesGlobal());
          push("/");
        }
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  };

  return (
    <>
      {article && !isLoading && !error ? (
        <div key={article.slug} className={styles.body}>
          <div className={styles.article}>
            <div className={styles.article_content}>
              <div className={styles.article_header}>
                <div id={article.slug} className={styles.article_title}>
                  {article.title}
                </div>
                <div className={styles.article_likes}>
                  {/* FOLLOWER/LIKES */}
                  <Follow
                    count={article.favoritesCount}
                    id={article.slug}
                    like={article.favorited}
                  />
                </div>
              </div>
              <div className={styles.article_tags}>
                {article.tagList
                  ? article.tagList.map((tag, index) =>
                      tag ? (
                        <div key={index}>
                          <span className={styles.article_tag}>
                            {String(tag).includes(" ")
                              ? tag.split(" ").slice(0, 1)
                              : String(tag).length > 10
                              ? tag.split("").slice(0, 9)
                              : String(tag)}
                          </span>
                        </div>
                      ) : null,
                    )
                  : null}
              </div>
              <div className={styles.article_text}>{article.description}</div>
            </div>

            {/* AUTHOR INFO */}
            <div className={styles.user}>
              <div className={styles.user_data}>
                <div className={styles.user_info}>
                  <p className={styles.user_name}>{article.author.username}</p>
                  <p className={styles.user_date}>
                    {format(parseISO(article.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <img
                    onError={() => setImageError(true)}
                    className={styles.user_avatar}
                    src={imageError ? avatar : article.author.image}
                    alt="avatar"
                  />
                </div>
              </div>

              {/* BUTTONS BLOCK */}
              {isLoggedIn && user.username === article.author.username ? (
                <div className={styles.user_buttons}>
                  <div className={styles.delete_actions}>
                    <button
                      id="delete"
                      onClick={() => setIsModalOpen(true)}
                      className={styles.user_article_delete}
                    >
                      Delete
                    </button>

                    {/* MODAL */}
                    <div
                      className={
                        styles.delete_modal +
                        " " +
                        (isModalOpen ? null : styles.visible)
                      }
                    >
                      <div className={styles.delete_modal_header}>
                        <img className={styles.alert} src={Vector} />
                        <p>Are you sure to delete this article?</p>
                      </div>
                      <div>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className={styles.delete_cancel}
                        >
                          No
                        </button>
                        <button
                          className={styles.delete_confirm}
                          onClick={() => deleteArticle()}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    id="edit"
                    onClick={() => editArticle()}
                    className={styles.user_article_edit}
                  >
                    Edit
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.article_body}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.body}
            </ReactMarkdown>
          </div>
        </div>
      ) : isLoading && !error ? (
        <Spin />
      ) : (
        <Alert
          message="Something went wrong, try another request"
          type="error"
          showIcon
        />
      )}
    </>
  );
};

export default SinglePage;
