import React from "react";
import SbEditable from "storyblok-react";

const Redirect = (props) => {
  const redirects = props.blok.redirects ? props.blok.redirects.tbody : "";

  return (
    <SbEditable content={props.blok}>
      <article>
        <section className={`ood-redirect-info`}>
          <table>
            <thead>
              <tr>
                <th>From Path</th>
                <th>To Path</th>
                <th>Status Code</th>
                <th>Enabled</th>
              </tr>
            </thead>
            <tbody>
              {redirects && redirects.map(function(data) {
                return (
                  <tr>
                    <td>{data.body[0].value}</td>
                    <td>{data.body[1].value}</td>
                    <td>{data.body[2].value}</td>
                    <td>{data.body[3].value}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </article>
    </SbEditable>
  );
};

export default Redirect;
