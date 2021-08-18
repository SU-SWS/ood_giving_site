import React from "react";
import { connectHits } from "react-instantsearch-dom";
import Stats from "./stats";
import SbLink from "../partials/sbLink";
import Pagination from "./pagination";
import Heading from "../partials/heading";

const Hits = (props) => {
  const AlgoliaHits = connectHits(({ hits }) => (
    <div className="search-hits">
      {!hits.length && (
        <div className="search-hits-no-hits">
          <Heading
            level={"h2"}
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

      {hits.map((hit) => (
        <article
          className="search-hits-item su-mb-2 su-pb-2 su-px-default"
          key={hit.objectID}
        >
          <Heading level={"h2"} serif={true} weight={"bold"}>
            <SbLink link={{ cached_url: `/${hit.slug}` }}>{hit.title}</SbLink>
          </Heading>
          <p className="su-mb-none">
            {hit.intro || hit.teaser || hit.description}
          </p>
        </article>
      ))}

      {hits.length > 0 && <Pagination initialPage={props.initialPage} />}
    </div>
  ));

  return <AlgoliaHits />;
};

export default Hits;
