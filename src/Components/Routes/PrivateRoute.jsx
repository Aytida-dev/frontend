import { Navigate, Outlet } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { user, isVerified } = useFirebase();

  if (!user) {
    return <Navigate to={"/intro"} />;
  } else if (!isVerified) {
    toast("Verify your email before singin");
    return <Navigate to={"/intro"} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
