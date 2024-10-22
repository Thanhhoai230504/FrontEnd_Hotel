import React from "react";
import { Navigate } from "react-router-dom";

interface AdminAuthProps<P> {
  Component: React.ComponentType<P>;
  allowedRoles: string[];
}

const AdminAuth = <P extends object>({
  Component,
  allowedRoles,
}: AdminAuthProps<P>): React.FC<P> => {
  return (props: P) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || !allowedRoles.includes(role || "")) { //nếu có là true và đảo ngược trả về false
      return <Navigate to="/not-authorized" />;
    }

    return <Component {...props} />;
  };
};

export default AdminAuth;
