import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useSelector((state) => state);
  const userRole = auth?.user?.role; 

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
