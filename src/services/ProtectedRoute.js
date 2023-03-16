import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // un hook personalizzato che usa Firebase auth

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!user) {
    return navigate("/");
  }

  return children;
}

export default ProtectedRoute;
