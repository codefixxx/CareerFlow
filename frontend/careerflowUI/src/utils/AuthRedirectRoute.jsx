import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const AuthRedirectRoute = ({ children }) => {
  const { isLoggedin, authLoading } = useContext(AppContext);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // If already logged in → redirect to /input
  if (isLoggedin) {
    return <Navigate to="/input" replace />;
  }

  return children;
};

export default AuthRedirectRoute;