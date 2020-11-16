import React from "react";
import { AdminTask } from "../components";
import EmployeeTasks from "../components/EmployeeTasks";
import { useAuth } from "../components/hooks";

const TaskContainer = () => {
  const { user } = useAuth();

  return (
    <div className="col-xs-10 col-xs-push-1">
      {user?.role === "admin" ? <AdminTask /> : <EmployeeTasks />}
    </div>
  );
};

export default TaskContainer;
