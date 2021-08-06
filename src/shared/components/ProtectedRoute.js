import { Route, Redirect } from "react-router-dom";
import AuthService from "shared/services/authService";

const ProtectedRoute = ({ component: Component }, ...rest) => {
  const session = localStorage.getItem("access_token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (session) {
          AuthService.setSession(session);
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
