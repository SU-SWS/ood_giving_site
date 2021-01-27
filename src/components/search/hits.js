import React from "react";
import { connectHits } from "react-instantsearch-dom";
import Stats from "./stats";
import SbLink from "../partials/sbLink";
import Pagination from "./pagination";
import Heading from "../partials/heading";

const Hits = props => {
  const AlgoliaHits = connectHits(({ hits }) => (
    <div className="search-hits">
      {!hits.length && (
        <div className="search-hits-no-hits">
          <Heading
            level={2}
            serif={true}
            weight={"bold"}
            classes="search-hits-no-hits-title"
          >
            {props.blok.noResultsErrorTitle}
          </Heading>
          <p className="search-hits-no-hits-text">
            {props.blok.noResultsErrorText}
          </p>
        </div>
      )}

      {hits.length > 0 && <Stats />}

      {hits.map(hit => (
        <article className="search-hits-item su-mb-3" key={hit.objectID}>
          <Heading level={2} serif={true} weight={"bold"}>
            <SbLink link={{ cached_url: `/${hit.slug}` }}>{hit.title}</SbLink>
          </Heading>
          <p>{hit.intro || hit.teaser || hit.description}</p>
        </article>
      ))}

      <Pagination initialPage={props.initialPage} />
    </div>
  ));

  return <AlgoliaHits />;
};

export default Hits;
