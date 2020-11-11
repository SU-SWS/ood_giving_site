import React, { useContext, useRef } from 'react'
import SbEditable from "storyblok-react"
import { UserContext, Anon } from "../../context/UserContext"

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

// Returns the script.
const getScript = (props, scriptRef) => {
  return (
    <SbEditable content={props.blok}>
      <div
        ref={scriptRef}
        dangerouslySetInnerHTML={{
          __html: props.blok.script,
        }}
      />
    </SbEditable>
  )
}

// THE COMPONENT
// -----------------------------------------------------------------------------
const GiveGabForm = (props) => {

  const { state: account, dispatch } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let profile = (account && account.profile) ? account.profile : false
  let isLoading = (account && account.loading && account.loading !== 0) ? true : false
  const isBrowser = typeof window !== `undefined`
  const scriptRef = useRef()

  if (user && user.suid && user.status == 1 && profile && isBrowser) {
    Window.su_gab_personal_email = user.email;
    Window.su_gab_personal_title = profile.name.fullNameParsed.prefix;
    Window.su_gab_personal_first = profile.name.fullNameParsed.firstName;
    Window.su_gab_personal_middle = profile.name.fullNameParsed.middleName;
    Window.su_gab_personal_last = profile.name.fullNameParsed.lastName;

    let address = findHomeAddress(profile.addresses);
    Window.su_gab_personal_co = address.addressCountry ?? '';
    Window.su_gab_personal_st = address.streetAddress1 ?? '';
    Window.su_gab_personal_st2 = address.streetAddress2 ?? '';
    Window.su_gab_personal_city = address.city ?? '';
    Window.su_gab_personal_state = address.stateProvince ?? '';
    Window.su_gab_personal_zip = address.zipPostalCode ?? '';

    let spouse = findSignificantOther(profile.relationships);
    Window.su_gab_partner_title = spouse.relatedContactGender == "Female" ? 'Mrs.' : 'Mr.'; // This line needs work and is not correct but will do for our sample data.
    Window.su_gab_partner_first = spouse.relatedContactFirstName ?? '';
    Window.su_gab_partner_middle = spouse.relatedContactMiddleName ?? '';
    Window.su_gab_partner_last = spouse.relatedContactLastName ?? '';
  }

  if (isBrowser) {
    Window.su_gab_personal_email = "sheamck@stanford.edu"
  }

  if (isLoading) {
    return (<h3>Loading...</h3>)
  }

  if (user && user.status == 0 && !isLoading) {
    return getScript(props, scriptRef)
  }

  if (user && user.status == 1 && !isLoading) {
    return getScript(props, scriptRef)
  }

  return null;
}

export default GiveGabForm
