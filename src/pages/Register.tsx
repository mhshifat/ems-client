import React from "react";
import { useDocumentTitle } from "../components/hooks";
import { RegisterContainer } from "../containers";

const Register = () => {
  useDocumentTitle("Register");

  return <RegisterContainer />;
};

export default Register;
