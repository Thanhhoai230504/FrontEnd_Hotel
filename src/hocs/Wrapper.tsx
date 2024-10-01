import React from "react";
import AdminAuth from "../hocs/AdminAuth";

interface ProtectedRouteProps {
  Component: React.ComponentType;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  Component,
  allowedRoles,
}) => {
  const AuthComponent = AdminAuth({ Component, allowedRoles });
  return <AuthComponent />;
};

export default ProtectedRoute;
