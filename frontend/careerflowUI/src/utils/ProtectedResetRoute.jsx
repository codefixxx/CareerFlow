import { Navigate, useSearchParams } from "react-router-dom";

export default function ProtectedResetRoute({ children }) {
  const [params] = useSearchParams();
  const token = params.get("token");

  if (!token) {
    return <Navigate to="/forgot-password" replace />;
  }

  return children;
}

