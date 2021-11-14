import { Route, Redirect } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

type PrivateRouteProps = {
  component: () => JSX.Element;
  path: string;
};
function PrivateRoute({ component, path }: PrivateRouteProps) {
  const { authenticated } = useAuthentication();
  return authenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
