import React, { useContext, useEffect } from 'react'
import { UserContext, fetchSSOStatus, fetchMegaProfile, Anon } from "../../context/UserContext"

/**
 * User Data Component for handling user state information.
 *
 * @param {*} props
 */
const userData = (props) => {
  const { state: account, dispatch } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon

  // Get the Mega Profile information from that API.
  const getMegaProfile = async (profileID) => {
    const mega = await fetchMegaProfile(profileID)
    if (mega && mega.encodedSUID) {
      dispatch({type: "addProfile", profile: mega })
      return mega
    }
    return false
  }

  /**
   * Get the user from the SSO status.
   */
  const getUser = async () => {
    // Get the status from the SSO first.
    const result = await fetchSSOStatus()
    if (result && result.name) {
      result.status = 1
      dispatch({type: "login", user: result })
      return result
    }

    return false
  };

  /**
   * Function to run other async functions.
   */
  const runEffect = async () => {
    let user = await getUser()
    if (user && user.encodedSUID) {
      await getMegaProfile(user.encodedSUID)
    }
    dispatch({type: "refresh"})
  }

  /**
   * Function to run other async functions.
   */
  useEffect(() => {
    runEffect()
  }, [])

  // Nothing to see here.
  return null
}

export default userData



