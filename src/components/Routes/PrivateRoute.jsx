import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";

const PrivateRoute = ({ children }) => {
  const adminUser = useSelector((state) => state.adminUser);
  const clientUser = useSelector((state) => state.clientUser);

  if (adminUser?.loading === false) {
    if (!adminUser?.isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } else if (clientUser?.loading === false) {
    if (!clientUser?.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } else {
    return <Loader />;
  }
};

export default PrivateRoute;
