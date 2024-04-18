import React, { useEffect, useState } from 'react';
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

  const [email, setEmail] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email') || '';
    setEmail(email);
  }, [location.search]);

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
          src={`https://airtable.com/embed/appssF3RJFHENkFV5/pagK0vwq4xqA4pUPa/form?prefill_userEmail=${email}&prefill_emailAddress=${email}&hide_emailAddress=true`}
          frameBorder="0"
          style={{
            background: 'transparent',
            width: '100%',
            height: '1200px',
          }}
          allowtransparency="true"
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
