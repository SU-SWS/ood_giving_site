import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from "gatsby"
import Fuse from 'fuse.js';

import PROFESSORSHIPS from '../../fixtures/professorships.json';

const fuse = new Fuse(PROFESSORSHIPS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'/*, 'WEBSITE'*/],
  includeScore: true,
  threshold: 0.3,
});

const getSubcategories = () => {
  const SUBS = PROFESSORSHIPS.map(item => item['SUBCATEGORY']);

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
  const {allProfessorshipsJson: { edges }} = useStaticQuery(graphql`
    query {
      allProfessorshipsJson {
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

  const professorshipsMap = convertArrayToObject(edges);

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
          onClick={() => setSearchResults(fuse.search(getSearchTerm))}
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
                  <Link to={`/professorships/${professorshipsMap[item].to}`}>
                    {professorshipsMap[item].label}
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
