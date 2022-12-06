import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <Link to="/" className={styles.header_title}>
          Realworld Blog
        </Link>
        <div className={styles.header_enterButtons}>
          <button className={styles.header_login}>Sing In</button>
          <button className={styles.header_register}>Sing Up</button>
        </div>
      </div>
    </>
  );
};
export default Header;
