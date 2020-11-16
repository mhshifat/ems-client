import React, { Fragment, useEffect, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import AdminAssignedTasks from "./AdminAssignedTasks";
import { User } from "./AdminDashboard";
import TaskForm from "./TaskForm";

const AdminTask = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [refetchTask, setRefetchTask] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await EMSApiService.getUsers(controller);
      setEmployees(res.data);
    })();
    return () => controller.abort();
  }, []);

  return (
    <Fragment>
      <TaskForm
        key={"task-form" + refetchTask}
        employees={employees.filter((employee) => employee.role !== "admin")}
        onSuccess={() => setRefetchTask(!refetchTask)}
      />
      <AdminAssignedTasks key={"admin-assigned-task" + refetchTask} />
    </Fragment>
  );
};

export default AdminTask;
