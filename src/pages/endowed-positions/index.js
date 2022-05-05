import React, { useState } from 'react';
import { graphql, navigate, Link, useStaticQuery } from "gatsby"
import Fuse from 'fuse.js';

import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'/*, 'WEBSITE'*/],
  includeScore: true,
  threshold: 0.3,
});

const getSubcategories = () => {
  const SUBS = ENDOWED_POSITIONS.map(item => item['SUBCATEGORY']);

  return [...new Set(SUBS)];
};

const convertArrayToObject = (array) => {
  return array.reduce((obj, item) => (
    {
      ...obj,
      [item?.node?.jsonId]: {
        label: item?.node?.label,
        section: item?.node?.section,
        to: item?.node?.to
      },
    }
  ), {});
};


const Index = () => {
  const [getSearchResults, setSearchResults] = useState(null);
  const [getSearchTerm, setSearchTerm] = useState('');
  const {allEndowedPositionsMapJson: { edges }} = useStaticQuery(graphql`
    query {
      allEndowedPositionsMapJson {
        edges {
          node {
            jsonId
            label
            to
          }
        }
      }
    }
  `);

  const endowedPositionsMap = convertArrayToObject(edges);

  return (
    <>
      <div css={{display: 'flex'}}>
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          value={getSearchTerm} 
        />
        <button
          onClick={() => navigate(`/endowed-positions/search?term=${getSearchTerm}`)}
        >
          Submit
        </button>
        <button
          onClick={() => setSearchResults(null)}
        >
          Reset
        </button>
      </div>
      {getSearchResults &&
        getSearchResults.map((item, index) => {
          return (
            <dl key={`${item.item['CURRENT HOLDER']}-${index}`}>
              <dt>{item.item['CURRENT HOLDER']}</dt>
              <dd>{item.item['POSITION']}</dd>
              <dd>{item.item['WEBSITE']}</dd>
            </dl>
          );
        })
      }
      {!getSearchResults &&
        <>
          <ul css={{listStyle: 'none', margin: '0', padding: 0, display: 'flex', fontSize: '12px', flexWrap: 'wrap'}}>
            {getSubcategories().map(item => {
              return (
                <li css={{margin: '10px', cursor: 'pointer'}} key={item}>
                  <Link to={`/endowed-positions/${endowedPositionsMap[item].to}`}>
                    {endowedPositionsMap[item].label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      }
    </>
  );
};

export default Index;
