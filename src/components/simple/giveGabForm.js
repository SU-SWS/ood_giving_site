import React, { useContext, useRef, useEffect } from 'react'
import SbEditable from "storyblok-react"
import { UserContext, Anon, isLoggedIn } from "../../context/UserContext"

// Find thte home address information.
const findHomeAddress = (addresses) => {
  let found = false;

  Object.entries(addresses).map(([key, val]) => {
    if (val.addressType === "Home") {
      found = val.addressParsed;
    }
  })

  return found
}

// Find the significant other information.
const findSignificantOther = (relationships) => {
  let found = false;

  Object.entries(relationships).map(([key, val]) => {
    if (val.relationshipType === "Spouse/Partner") {
      found = val.relatedContactFullNameParsed;
    }
  })

  return found
}

// THE COMPONENT
// -----------------------------------------------------------------------------
const GiveGabForm = (props) => {

  const { state: account, dispatch } = useContext(UserContext)
  const isBrowser = typeof window !== `undefined`
  const scriptRef = useRef()
  let user = (account && account.user) ? account.user : Anon
  let profile = (account && account.profile) ? account.profile : false
  let isLoading = (account && account.loading !== 0) ?? true

  if (isLoading) {
    return (<h3>Loading...</h3>)
  }

  if (user && user.suid && user.status == 1 && profile && isBrowser) {
    window.su_gab_personal_email = user.email;
    window.su_gab_personal_title = profile.name.fullNameParsed.prefix;
    window.su_gab_personal_first = profile.name.fullNameParsed.firstName;
    window.su_gab_personal_middle = profile.name.fullNameParsed.middleName;
    window.su_gab_personal_last = profile.name.fullNameParsed.lastName;

    let address = findHomeAddress(profile.addresses);
    // window.su_gab_personal_co = address.addressCountry ?? '';
    window.su_gab_personal_st = address.streetAddress1 ?? '';
    window.su_gab_personal_st2 = address.streetAddress2 ?? '';
    window.su_gab_personal_city = address.city ?? '';
    window.su_gab_personal_state = address.stateProvince ?? '';
    window.su_gab_personal_zip = address.zipPostalCode ?? '';

    let spouse = findSignificantOther(profile.relationships);
    window.su_gab_partner_first = spouse.relatedContactFirstName ?? '';
    window.su_gab_partner_middle = spouse.relatedContactMiddleName ?? '';
    window.su_gab_partner_last = spouse.relatedContactLastName ?? '';
  }

  const doOnLoad = (props) => {
    const script = document.createElement('script');
    script.src = props.blok.script
    window.document.body.appendChild(script)
  }

  return (
    <SbEditable content={props.blok}>
      <div id={`giveGabScript`} ref={scriptRef} />
      {doOnLoad(props)}
    </SbEditable>
  )

}

export default GiveGabForm
