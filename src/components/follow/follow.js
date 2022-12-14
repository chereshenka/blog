import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux/es";

import { token } from "../../store/reducers/actions";

import styles from "./follow.module.scss";

const Follow = (props) => {
  const { id, count, like } = props;
  const [heartState, setHeartState] = useState(like);
  const [heartCount, setHeartCount] = useState(count);
  const { isLoggedIn } = useSelector((state) => state.loginReducer);

  const likeSubmit = async () => {
    const urlBase = new URL("https://blog.kata.academy/api/articles");
    setHeartState((state) => !state);
    const method = !heartState ? "POST" : "DELETE";
    await fetch(urlBase + `/${id}/favorite`, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setHeartCount(() => json.article.favoritesCount);
        setHeartState(() => json.article.favorited);
      })
      .catch((e) => {
        throw new Error(e.message);
      });
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
