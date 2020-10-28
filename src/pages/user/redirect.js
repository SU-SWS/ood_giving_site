import React, { useEffect } from "react"
import { navigate } from 'gatsby'
import { fetchUserData, setUser } from "../../utilities/auth"

const getReturnTo = () => {
  let ret = window.sessionStorage.getItem("returnto")
  window.sessionStorage.removeItem("returnto")

  // Home James...
  if (ret === null) {
    ret = "/"
  }

  return ret
}

const RedirectPage = () => {

  useEffect(() => {

    const getUser = async () => {
      const result = await fetchUserData()
      setUser(result);
    };
    getUser();
    navigate(getReturnTo());
  }, []);

  return null;
}

export default RedirectPage
