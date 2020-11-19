/**
 * Credit where credit is deserved.
 * @see: https://github.com/christo-pr/dangerously-set-html-content
 *
 */
import React, { useEffect, useRef } from 'react'
import SbEditable from "storyblok-react"

const EmbedScript = (props) => {

  const myEmbed = useRef(null);
  const { blok: { script:html } , ...rest } = props

  useEffect(() => {
    if (!html) return

    // Create a 'tiny' document and parse the html string.
    // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    const slotHtml = document.createRange().createContextualFragment(html)

    console.log(slotHtml)

    const scripts = slotHtml.querySelectorAll('script')
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
    myEmbed.current.appendChild(slotHtml)

    console.log(myEmbed.current)
  }, [html])


  return (
    <SbEditable content={props.blok}>
      <div
        ref={myEmbed}
        {...rest}
      />
    </SbEditable>
  )
}

export default EmbedScript
