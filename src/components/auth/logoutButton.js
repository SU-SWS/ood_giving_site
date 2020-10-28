import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from "../../utilities/auth"

const triggerLogout = () => {
  navigate("/user/logout");
}

const LogoutButton = (props) => {

  const [auth, setAuth] = useState(false);
  let theButton = null;

  useEffect(() => {
    const validateUser = async () => {
      const result = await isLoggedIn()
      setAuth(result);
    };
    validateUser();
  }, []);

  if (auth) {
    theButton = (
      <button onClick={triggerLogout}>{props.children}</button>
    )
  }

  // Return the button to login if not authenticated.
  return theButton
};

export default LogoutButton
