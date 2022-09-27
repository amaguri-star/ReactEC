import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"

// 
/**
 * ...restにはPrivateRouteに設定されているpropsのpathとexactの値が入っている。
 * 下記コードのようにも書き換えられる。
 * 
 * const PrivateRoute = ({ component, exact, path }) => {
 *  const { user } = useAuthContext();
 *  return user ? (
 *      <Route exact={exact} path={path} component={component} />
 *  ) : (
 *      <Redirect to="/login" />
 *  );
 * };
 * 
 * ...restの中身は？
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuthContext();

    // routePropsにはroute propsであるmatch, location, historyが含まれている。
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return user ? <Component {...routeProps} /> : <Redirect to="/login" />;
            }}
        />
    );
}

export default PrivateRoute;