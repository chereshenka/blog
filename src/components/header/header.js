import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import avatar from "../../img/avatar.png";
import { useDispatch, useSelector } from "react-redux/es";
import { loginUser } from "../../store/reducers/actions";

const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const push = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <Link to="/" className={styles.header_title}>
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
                <p className={styles.header_logged_username}>{user.username}</p>
                <img
                  className={styles.header_logged_avatar}
                  src={user.image || avatar}
                />
              </div>
              <Link
                to="/"
                onClick={() => dispatch(loginUser({}))}
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
    </>
  );
};
export default Header;
