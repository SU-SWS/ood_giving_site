import React, { useContext } from 'react'
import SbEditable from "storyblok-react"
import { UserContext, Anon } from "../../context/UserContext"

const EmbedScript = (props) => {

  const { state: account } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let prescript, postscript;

  if (props.blok && props.blok.pre_script) {
    prescript = (<div
      dangerouslySetInnerHTML={{
        __html: props.blok.pre_script,
      }}
    />)
  }

  if (props.blok && props.blok.post_script) {
    postcript = (<div
      dangerouslySetInnerHTML={{
        __html: props.blok.post_script,
      }}
    />)
  }

  return (
    <SbEditable content={props.blok}>
      {prescript}
      <div
        dangerouslySetInnerHTML={{
          __html: props.blok.script,
        }}
      />
      {postscript}
      {JSON.stringify(user, undefined, 2)}
    </SbEditable>
  )
}

export default EmbedScript
