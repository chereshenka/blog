import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

import avatar from "../../img/avatar.png";
import Follow from "../follow/follow";

import styles from "./article.module.scss";

const Article = (props) => {
  const {
    author,
    createdAt,
    title,
    tagList,
    slug,
    favorited,
    favoritesCount,
    description,
  } = props;
  const { username, image } = author;

  const [imageError, setImageError] = useState(false);

  const tagsSorter = () => {
    if (tagList) {
      return tagList.map(
        (tag, index) =>
          tag && (
            <div key={index}>
              <span className={styles.article_tag}>
                {(String(tag).includes(" ") && tag.split(" ")[0]) ||
                  (String(tag).length > 10 && String(tag).slice(0, 9)) ||
                  String(tag)}
              </span>
            </div>
          ),
      );
    }
  };
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
            <div className={styles.article_likes}>
              <Follow
                count={favoritesCount}
                id={slug}
                like={favorited}
                folow={props.author.following}
              />
            </div>
          </div>
          <div className={styles.article_tags}>{tagsSorter()}</div>
          <div className={styles.article_text}>
            <p>{description}</p>
          </div>
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
              onError={() => setImageError(true)}
              src={imageError || image == undefined ? avatar : image}
              className={styles.user_avatar}
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
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
};

export default Article;
