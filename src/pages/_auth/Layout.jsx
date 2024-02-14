import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";

const AuthComponent = () => {
  const {
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
  } = useUserContext();

  return (
    <div>
      {/* Formulir login */}
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <h5>Layout</h5>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default AuthComponent;
