import { React, useEffect } from "react"
import { navigate } from 'gatsby';

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
    navigate(getReturnTo());
  }, []);

  return null;
}

export default RedirectPage
