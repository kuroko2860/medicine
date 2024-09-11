import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Nếu không có token, chuyển hướng người dùng tới trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, render các component con (trong trường hợp này là Home)
  return children;
};

export default PrivateRoute;
