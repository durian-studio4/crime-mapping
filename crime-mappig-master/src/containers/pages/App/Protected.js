import * as React from "react";
import { Redirect, Route } from "react-router-dom";
// import Cookie from "js-cookie"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = (props) => {
  const isAuthenticated = localStorage.getItem("isLogin");
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
