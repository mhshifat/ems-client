import React, { Fragment } from "react";
import { useAuth, useDocumentTitle } from "../components/hooks";
import { DashboardContainer } from "../containers";

const Dashboard = () => {
  const { user } = useAuth();
  useDocumentTitle("Dashboard");

  return (
    <Fragment>
      <p>Welcome to {user?.role} dashboard</p>
      <DashboardContainer />
    </Fragment>
  );
};

export default Dashboard;
