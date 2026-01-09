import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, authLoading } = useContext(AppContext);

  if (authLoading) {
    // show nothing or a spinner while checking auth
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isLoggedin) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // logged in → render the protected page
  return children;
};

export default ProtectedRoute;



