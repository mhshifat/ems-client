import React, { useEffect, useState } from "react";
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

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...restProps
}) => {
  const { user } = useAuth();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const isLoggedIn = !!user?.uid;

  return shouldRender ? (
    <Route
      {...restProps}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  ) : (
    <p>Loading...</p>
  );
};

export default PrivateRoute;
