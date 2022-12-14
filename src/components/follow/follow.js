import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux/es";

import { favotiteOptions } from "../../fetch-server/set-unset-favorite";

import styles from "./follow.module.scss";

const Follow = (props) => {
  const { id, count, like } = props;
  const [heartState, setHeartState] = useState(like);
  const [heartCount, setHeartCount] = useState(count);
  const { isLoggedIn } = useSelector((state) => state.loginReducer);

  const likeSubmit = async () => {
    const url = new URL("https://blog.kata.academy/api/articles");
    setHeartState((state) => !state);
    const token = localStorage.getItem("token");
    const method = !heartState ? "POST" : "DELETE";
    if (isLoggedIn && token) {
      await favotiteOptions(url, id, method)
        .then((res) => res.json())
        .then((json) => {
          setHeartCount(() => json.article.favoritesCount);
          setHeartState(() => json.article.favorited);
        })
        .catch((e) => {
          throw new Error(e.message);
        });
    }
  };
  return (
    <>
      <button
        onClick={likeSubmit}
        className={styles.follow}
        disabled={!isLoggedIn ? true : false}
      >
        <span
          className={
            styles.follow_heart + " " + (heartState ? styles.active : "")
          }
        >
          {heartState ? "❤" : "♡"}
        </span>
        {heartCount}
      </button>
    </>
  );
};

Follow.propTypes = {
  count: PropTypes.number,
  id: PropTypes.string,
  like: PropTypes.bool,
};

export default Follow;
