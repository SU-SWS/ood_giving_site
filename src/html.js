import React from 'react'
import HtmlHead from './components/partials/htmlHead'

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <HtmlHead />
        {this.props.headComponents}

      </head>
      <body>
      <header>
      </header>

      <main
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: this.props.body }}
      />
      {this.props.postBodyComponents}
      <script
        key="fun_javascript"
        dangerouslySetInnerHTML={{
          __html: `
        console.log('Happy Coding and Stay Safe!!')
      `,
        }}
      />
      </body>
      </html>
    );
  }
}