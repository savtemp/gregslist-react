import React, { useEffect, useState } from "react";
import { AuthService } from "../services/AuthService.js";

const AuthGuard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false)
      // if there is no token then re-direct away from the router and allows them to come back to the same location when they come back
      return AuthService.loginWithRedirect({
        appState: {
          // you can return to the same location after being re-directed
          targetUrl: location.hash
        }
      })
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    // if you are logged in return the react fragment 
    <React.Fragment>
      {
        // if you are logged on then render the children of the component, if not logged in then render nothing(render null)
        // eslint-disable-next-line react/prop-types
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
}
export default AuthGuard;