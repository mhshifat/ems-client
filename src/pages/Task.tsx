import React from "react";
import { useDocumentTitle } from "../components/hooks";
import { TaskContainer } from "../containers";

const Task = () => {
  useDocumentTitle("Assign Task");

  return <TaskContainer />;
};

export default Task;
