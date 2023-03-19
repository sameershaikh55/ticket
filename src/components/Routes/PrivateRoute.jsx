import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";

const PrivateRoute = ({ children }) => {
  const clientUser = useSelector((state) => state.clientUser);

  if (clientUser?.loading === false) {
    if (
      !clientUser?.isAuthenticated ||
      clientUser?.user.email !== "user@user.com"
    ) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } else {
    return <Loader />;
  }
};

export default PrivateRoute;
