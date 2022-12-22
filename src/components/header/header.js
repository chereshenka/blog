import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es";

import avatar from "../../img/avatar.png";
import { fetchArticlesGlobal, loginUser } from "../../store/reducers/actions";

import styles from "./header.module.scss";
const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => {
    return state.loginReducer;
  });

  const dispatch = useDispatch();
  const push = useNavigate();
  const [imageError, setImageError] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link
            className={styles.header_title}
            onClick={() => {
              dispatch(fetchArticlesGlobal());
              push("/");
            }}
          >
            Realworld Blog
          </Link>
          <div className={styles.header_enterButtons}>
            {isLoggedIn ? (
              <>
                <Link to="/new-article" className={styles.header_newarticle}>
                  Create article
                </Link>
                <div
                  onClick={() => push("/profile")}
                  className={styles.header_logged_user}
                >
                  <p className={styles.header_logged_username}>
                    {user.username}
                  </p>
                  <img
                    onError={() => setImageError(true)}
                    src={
                      imageError || user.image == undefined
                        ? avatar
                        : user.image
                    }
                    className={styles.header_logged_avatar}
                  />
                </div>
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(
                      loginUser({
                        isLoggedIn: false,
                        user: {},
                      }),
                    );
                    localStorage.removeItem("token");
                  }}
                  className={styles.header_logout}
                >
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/sing-in" className={styles.header_login}>
                  Sing In
                </Link>
                <Link to="/sing-up" className={styles.header_register}>
                  Sing Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
