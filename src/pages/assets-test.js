import React from "react"

const TestAssetUrl = (props) => {
  return (
    <React.Fragment>
    <h2>STORYBLOK CDN URLS</h2>
    <p>Image</p>
    <img className="" src="https://img2.storyblok.com/800x0/f/78141/2400x1600/38bcee97d0/img_5297b.jpg" alt="" />
    <p>PDFS</p>
    <a href="https://a.storyblok.com/f/78141/x/f4208440b6/irrevocable-stock-gift-letter-12_11_20-interactive.pdf">Download PDF</a>
    <h2>Redirected URLS</h2>
    <p>Image</p>
    <img className="" src="/cdn/img/800x0/f/78141/2400x1600/38bcee97d0/img_5297b.jpg" alt="" />
    <p>PDFS</p>
    <a href="/cdn/assets/f/78141/x/f4208440b6/irrevocable-stock-gift-letter-12_11_20-interactive.pdf">Download PDF</a>
    </React.Fragment>
  )
}

export default TestAssetUrl
