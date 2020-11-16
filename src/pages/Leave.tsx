import React from "react";
import { useDocumentTitle } from "../components/hooks";
import { LeaveContainer } from "../containers";

const Leave = () => {
  useDocumentTitle("Assign Leave");

  return <LeaveContainer />;
};

export default Leave;
