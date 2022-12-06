import React from "react";
import styles from "./article.module.scss";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const Article = (props) => {
  const {
    author,
    createdAt,
    title,
    tagList,
    // updatedAt,
    slug,
    favoritesCount: likes,
    description,
  } = props;
  const { username, image } = author;
  console.log(image);
  return (
    <>
      <div key={slug} className={styles.body}>
        <div className={styles.article}>
          <div className={styles.article_header}>
            <Link
              to={`/articles/${slug}`}
              id={slug}
              className={styles.article_title}
            >
              {title}
            </Link>
            <div className={styles.article_likes}>{likes}</div>
          </div>
          <div className={styles.article_tags}>
            {tagList
              ? tagList.map((tag, index) =>
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
          <div className={styles.article_text}>{description}</div>
        </div>
        <div className={styles.user}>
          <div className={styles.user_info}>
            <p className={styles.user_name}>{username}</p>
            <p className={styles.user_date}>
              {format(parseISO(createdAt), "MMMM d, yyyy")}
            </p>
          </div>
          <div>
            <img
              className={styles.user_avatar}
              src={image}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </>
  );
};
Article.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.object,
  createdAt: PropTypes.string,
  tagList: PropTypes.array,
  updatedAt: PropTypes.string,
  favoritesCount: PropTypes.number,
};

export default Article;
