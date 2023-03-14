import React from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "../config/firebase"; // un hook personalizzato che usa Firebase auth

function ProtectedRoute({ element: Element, ...rest }) {
  // ottiene l'utente corrente da Firebase
  return (
    <Route
      {...rest}
      Element
      /*  {
        auth.currentUser ? ( // se l'utente è autenticato
          Element // renderizza l'elemento corrispondente alla rotta
        ) : (
          <Navigate to="/" /> // altrimenti reindirizza alla pagina di login
        )
      } */
    ></Route>
  );
}

export default ProtectedRoute;
