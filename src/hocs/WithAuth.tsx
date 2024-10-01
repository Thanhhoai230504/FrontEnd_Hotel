import React from "react";
import { Navigate } from "react-router-dom";

const WithAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    // Nếu đã đăng nhập, điều hướng về trang chủ
    if (isAuthenticated === "true") {
      return <Navigate to="/" />;
    }

    // Nếu chưa đăng nhập, hiển thị component (login hoặc signup)
    return <Component {...props} />;
  };
};

export default WithAuth;
