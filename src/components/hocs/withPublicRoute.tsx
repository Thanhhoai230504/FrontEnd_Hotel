import { Navigate } from 'react-router-dom';

const withPublicRoute = (WrappedComponent: React.ComponentType) => {
  return function WithPublicRoute(props: any) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (token && user) {
      // If user is authenticated, redirect based on role
      return <Navigate to={role === 'admin' ? '/Admin/Rooms' : '/'} replace />;
    }

    // If user is not authenticated, render the original component
    return <WrappedComponent {...props} />;
  };
};

export default withPublicRoute;