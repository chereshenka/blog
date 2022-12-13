import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../header/header";

import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
