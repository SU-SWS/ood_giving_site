import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const Product = (props) => (
  <SbEditable content={props.blok}>
    <div className="product">
      <article className="su-card">
        <section className="su-card__contents">
          <h3 className="su-type-c">{props.blok.productName}</h3>
          <p className="su-small-paragraph">{props.blok.productDescription}</p>
          <div className="product--price">{"$" + props.blok.productPrice}</div>
          <div className="product--price-type su-small-paragraph">{props.blok.productPriceType}</div>
        </section>
      </article>
    </div>
  </SbEditable>
)

export default Product