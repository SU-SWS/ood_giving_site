import React, { useState, useEffect } from 'react'
import { isLoggedIn, doLogin } from "../../utilities/auth"

const LoginButton = (props) => {

  const [auth, setAuth] = useState(false);
  let theButton = null;

  useEffect(() => {
    const validateUser = async () => {
      const result = await isLoggedIn();
      setAuth(result);
    };
    validateUser();
  }, [auth]);

  if (!auth) {
    theButton = (
      <button onClick={doLogin}>{props.children}</button>
    )
  }

  // Return the button to login if not authenticated.
  return theButton

};

export default LoginButton
