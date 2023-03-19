import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";

const AdminRoute = ({ children }) => {
  const adminUser = useSelector((state) => state.adminUser);

  if (adminUser?.loading === false) {
    if (
      !adminUser?.isAuthenticated &&
      adminUser.user.email === "user@user.com"
    ) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } else {
    return <Loader />;
  }
};

export default AdminRoute;
