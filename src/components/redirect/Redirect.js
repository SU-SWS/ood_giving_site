import React from "react";
import SbEditable from "storyblok-react";

const Redirect = (props) => {
  const mapping = {
    'From Path': props.blok.from ? props.blok.from : "N/A",
    'To Path': props.blok.to ? props.blok.to : "N/A",
    'Status Code': props.blok.statusCode ? props.blok.statusCode : "301",
    'Enabled': props.blok.enabled ? "TRUE" : "FALSE"
  };

  return (
    <SbEditable content={props.blok}>
      <article>
        <section className={`ood-redirect-info`}>
          <table>
            <thead>
              <tr>
                {Object.keys(mapping).map(function(data) {
                  return (<th>{data}</th>)
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(mapping).map(function(data) {
                  return (<td>{data}</td>)
                })}
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    </SbEditable>
  );
};

export default Redirect;
