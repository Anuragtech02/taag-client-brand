import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ component: RouteComponent }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser && !localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return <RouteComponent />;
};

export default PrivateRoute;
