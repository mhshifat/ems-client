import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useAuth } from "../hooks";

interface Props extends RouteProps {
  component: React.FC<RouteComponentProps>;
}

const PublicRoute: React.FC<Props> = ({
  component: Component,
  ...restProps
}) => {
  const { user } = useAuth();

  const isLoggedIn = !!user?.uid;

  return (
    <Route
      {...restProps}
      render={(props) =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
