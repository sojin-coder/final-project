import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;