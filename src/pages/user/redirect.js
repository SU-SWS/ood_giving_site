import React, { useEffect } from "react"
import { navigate } from 'gatsby'

const doReturnTo = () => {
  let ret = window.sessionStorage.getItem("returnto")
  window.sessionStorage.removeItem("returnto")

  if (ret && ret.length > 1) {
    window.location = ret
  }

  navigate("/")
}

const RedirectPage = () => {

  useEffect(() => {
    doReturnTo();
  }, []);

  return null;
}

export default RedirectPage
