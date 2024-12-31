import { Navigate } from 'react-router-dom';

const withAdminRoute = (WrappedComponent: React.ComponentType) => {
  return function WithAdminRoute(props: any) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    // Kiểm tra nếu người dùng đã đăng nhập và có vai trò admin
    if (token && user && role === 'admin') {
      return <WrappedComponent {...props} />;
    }

    // Nếu không phải admin hoặc chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to="/Login" replace />;
  };
};

export default withAdminRoute;
