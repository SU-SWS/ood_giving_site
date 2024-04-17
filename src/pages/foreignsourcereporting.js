import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import CreateStories from '../utilities/createStories';

const ForeignSourceReporting = ({ data, location }) => {
  const oodLocalHeader = {
    ...data?.header,
    content: JSON.parse(data?.header.content),
  };
  const oodLocalFooter = {
    ...data?.footer,
    content: JSON.parse(data?.footer.content),
  };
  const globalFooter = {
    ...data?.globalFooter,
    content: JSON.parse(data?.globalFooter.content),
  };
  return (
    <>
      <Helmet>
        <title>Foreign Source Reporting</title>
        <meta
          name="description"
          content="Foreign Source Reporting form for Stanford Giving."
        />
      </Helmet>
      <CreateStories stories={[oodLocalHeader]} />
      <div>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/appqrMELkE4ZYdFly/pagrpihZXaAaE34DJ/form"
          frameBorder="0"
          style={{
            background: 'transparent',
            // border: '1px solid #ccc',
            width: '100%',
            height: '1000px',
          }}
          allowTransparency
        />
      </div>
      <CreateStories stories={[oodLocalFooter, globalFooter]} />
    </>
  );
};

export const query = graphql`
  query {
    header: storyblokEntry(field_component: { eq: "oodLocalHeader" }) {
      id
      content
    }
    footer: storyblokEntry(field_component: { eq: "oodLocalFooter" }) {
      id
      content
    }
    globalFooter: storyblokEntry(field_component: { eq: "globalFooter" }) {
      id
      content
    }
  }
`;

export default ForeignSourceReporting;
