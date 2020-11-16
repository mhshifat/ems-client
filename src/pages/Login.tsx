import React from "react";
import { useDocumentTitle } from "../components/hooks";
import { LoginContainer } from "../containers";

const Login = () => {
  useDocumentTitle("Login");

  return <LoginContainer />;
};

export default Login;
