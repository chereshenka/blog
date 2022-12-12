import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux/es";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.userLogin.isLoggedIn);
  if (!auth) {
    return <Navigate to="/sing-in" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.object,
};
