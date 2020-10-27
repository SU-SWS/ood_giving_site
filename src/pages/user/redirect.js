import { React, useEffect } from "react"
import Layout from "../../components/layout"
import { Redirect } from '@reach/router'
import { navigate } from 'gatsby';



const RedirectPage = () => {

  useEffect(() => {
    navigate('/test-items/givegab-test');
  }, []);

  return null;
}

export default RedirectPage
