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
                    {data.body && data.body.map(function(item) {
                      return (
                        <td>{item.value}</td>
                      )
                    })}
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
