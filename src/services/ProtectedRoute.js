import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // un hook personalizzato che usa Firebase auth

function ProtectedRoute({ children, redirectTo }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      console.error("l'utente non è autorizzato");
      if (location.pathname !== redirectTo) {
        return navigate(redirectTo);
      }
    }
  }, [user, navigate, redirectTo]);

  return children;
}

export default ProtectedRoute;
