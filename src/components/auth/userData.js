import React, { useContext, useEffect } from 'react'
import { fetchUserData } from "../../utilities/auth"
import { UserContext } from "../../context/UserContext"

const userData = (props) => {
  const { state: { user }, dispatch } = useContext(UserContext);

  useEffect(() => {

    const getUser = async () => {
      const result = await fetchUserData()
      if (result && result.name) {
        result.status = 1
        dispatch({type: "login", user: result })
      }
    };
    getUser();
  }, [])

  return null
}

export default userData



