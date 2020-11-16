import decode from "jwt-decode";
import React, { Fragment, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../components/hocs";
import { useAuth } from "../components/hooks";
import { Header } from "../components/layouts";
import {
  Dashboard,
  EditUser,
  Leave,
  Login,
  Register,
  Task,
  ViewTask,
} from "../pages";
import { UserType } from "../providers/AuthProvider";

const Routes = () => {
  const { setUser } = useAuth();
  const setUserRef = useRef(setUser);

  useEffect(() => {
    const token = localStorage.getItem("tid");
    if (!token) {
      setUserRef.current?.(null);
    } else {
      try {
        const decodedUser = decode(token);
        setUserRef.current?.(decodedUser as UserType);
      } catch (err) {
        localStorage.removeItem("tid");
        setUserRef.current?.(null);
      }
    }
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PublicRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/user/:id" component={EditUser} />
          <PrivateRoute exact path="/task" component={Task} />
          <PrivateRoute path="/task/:id" component={ViewTask} />
          <PrivateRoute path="/leave" component={Leave} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Routes;
