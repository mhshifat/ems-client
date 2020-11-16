import React from "react";
import { AdminDashboard, EmployeeDashboard } from "../components";
import { useAuth } from "../components/hooks";

const DashboardContainer = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? (
    <AdminDashboard />
  ) : user?.role === "employee" ? (
    <EmployeeDashboard />
  ) : null;
};

export default DashboardContainer;
