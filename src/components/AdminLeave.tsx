import React, { Fragment, useEffect, useState } from "react";
import { EMSApiService } from "../services/api/ems";
import AdminAssignedLeaves from "./AdminAssignedLeaves";
import { User } from "./AdminDashboard";
import LeaveForm from "./LeaveForm";

const AdminLeave = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [refetchLeave, setRefetchLeave] = useState(false);

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
      <LeaveForm
        key={"leave-form" + refetchLeave}
        employees={employees.filter((employee) => employee.role !== "admin")}
        onSuccess={() => setRefetchLeave(!refetchLeave)}
      />
      <AdminAssignedLeaves key={"admin-assigned-leaves" + refetchLeave} />
    </Fragment>
  );
};

export default AdminLeave;
