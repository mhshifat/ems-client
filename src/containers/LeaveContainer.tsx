import React from "react";
import { AdminLeave, EmployeeLeaves } from "../components";
import { useAuth } from "../components/hooks";

const LeaveContainer = () => {
  const { user } = useAuth();

  return (
    <div className="col-xs-10 col-xs-push-1">
      {user?.role === "admin" ? <AdminLeave /> : <EmployeeLeaves />}
    </div>
  );
};

export default LeaveContainer;
