import React from "react";
import { useDocumentTitle } from "../components/hooks";
import { EditUserContainer } from "../containers";

const EditUser = () => {
  useDocumentTitle("Edit User");

  return <EditUserContainer />;
};

export default EditUser;
