
/**
 * Credit where credit is deserved.
 * @see: https://github.com/christo-pr/dangerously-set-html-content
 *
 * Use this widget with caution. There are no safeguards on what it can do. It
 * is also not good practice to inject and manipulate the page outside of
 * REACT as that can lead to irregularities and troubles.
 */

import React,{ useContext, useEffect, useRef } from 'react'
import SbEditable from "storyblok-react"
import { UserContext, Anon } from "../../context/UserContext"

const EmbedScript = (props) => {

  const { state: account } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let prescript, postscript;
  const myEmbed = useRef(null);
  const { blok: { script:html } } = props

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

  useEffect(() => {
    if (!html) return

    // Create a 'tiny' document and parse the html string.
    // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    const miniDom = document.createRange().createContextualFragment(html)

    // Force the scripts in the embed script field to load sync.
    const scripts = miniDom.querySelectorAll('script')
    if (scripts.length >= 1) {
      for (let item of scripts) {
        if (item.src && item.src.length > 1) {
          item.async = 0
          item.defer = 0
        }
      }
    }

    // Clear the container.
    myEmbed.current.innerHTML = ''

    // Append the new content.
    myEmbed.current.appendChild(miniDom)
  }, [html])

  console.log("Refreshing embed component.")

  return (
    <SbEditable content={props.blok}>
      {prescript}
      <div ref={myEmbed} />
      {postscript}
      {JSON.stringify(user, undefined, 2)}
    </SbEditable>
  )
}

export default EmbedScript
