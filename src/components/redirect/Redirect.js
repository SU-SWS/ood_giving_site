import React from "react";
import SbEditable from "storyblok-react";

const Redirect = (props) => {
  const mapping = {
    'From Path': props.blok.from ? props.blok.from : "N/A",
    'To Path': props.blok.to ? props.blok.to : "N/A",
    'Status Code': props.blok.statusCode ? props.blok.statusCode : "301",
    'Enabled': props.blok.enabled ? "TRUE" : "FALSE"
  };
  const map = function(type) {
    return Object[type](mapping).map(function(str) {
      return (type === 'keys' ? <th>{str}</th> : <td>{str}</td>);
    });
  }

  return (
    <SbEditable content={props.blok}>
      <article>
        <section className={`ood-redirect-info`}>
          <table>
            <thead><tr>{map('keys')}</tr></thead>
            <tbody><tr>{map('values')}</tr></tbody>
          </table>
        </section>
      </article>
    </SbEditable>
  );
};

export default Redirect;
