import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "../components/hooks";
import { ViewTaskContainer } from "../containers";

const ViewTask = () => {
  const params = useParams<{ id: string }>();
  useDocumentTitle("View Task: " + params.id);

  return <ViewTaskContainer />;
};

export default ViewTask;
