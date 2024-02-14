import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSignInAccount } from "../../../libs/react-query/Queries.jsx";
import { useUserContext } from "../../../contexts/AuthContext.jsx";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
  } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const handleSignin = async () => {
    const session = await signInAccount(loginData);
    if (!session.isSuccess) {
      console.log(session.data.error);
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      console.log({ title: "Loggined." });
      navigate("/");
    } else {
      console.log({ title: "Login failed. Please try again." });
      return;
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <button onClick={handleSignin}>
        {" "}
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
