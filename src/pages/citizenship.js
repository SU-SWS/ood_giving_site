import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import CreateStories from '../utilities/createStories';
import Heading from '../components/partials/heading';
import CenteredContainer from '../components/partials/centeredContainer';
import SbLink from '../components/partials/sbLink';

const ForeignSourceReporting = ({ data }) => {
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
      <CenteredContainer>
        <Heading level="h1" classes="su-mt-2 su-text-align-center">
          Thank you for your recent gift
        </Heading>
        <p>
          The federal government requires institutions of higher education, such
          as Stanford, to report gifts from a donor who is not a U.S. citizen
          when that donor makes gifts and other payments to Stanford with an
          aggregate value of $250,000 or more in a calendar year. Stanford must
          also report gifts and other payments received from a donor who has
          citizenship in one of certain specific countries (the list may change
          over time, and currently includes China (not including Hong Kong),
          Russia, Iran, and North Korea), when that donor makes gifts and other
          payments to Stanford having an aggregate value of $50,000 or more
          during a reporting period that runs from July 1 to June 30 of the
          following year. Your generous gift(s) meet one or both of these
          reporting thresholds. Thank you for providing your information below.
        </p>
        <p>
          You can find additional details about this policy in section V of
          Stanford’s Gift Policy website:{' '}
          <SbLink
            linkType="url"
            link={{
              url: 'https://giving.stanford.edu/gift-policy',
            }}
          >
            https://giving.stanford.edu/gift-policy
          </SbLink>
        </p>
      </CenteredContainer>
      <div>
        <iframe
          className="airtable-embed"
          src={`https://airtable.com/embed/appssF3RJFHENkFV5/pagMeYcyTjtVgfsl4/form`}
          frameBorder="0"
          style={{
            background: 'transparent',
            width: '100%',
            height: '1000px',
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
