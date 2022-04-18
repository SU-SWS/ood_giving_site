import React, { useMemo, useState } from 'react';
import { Link } from "gatsby"
import Fuse from 'fuse.js';
import { useTable } from 'react-table';

import PROFESSORSHIPS from '../../fixtures/professorships.json';
import PROFESSORSHIPS_MAP from '../../constants/PROFESSORSHIPS_MAP';

const fuse = new Fuse(PROFESSORSHIPS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'/*, 'WEBSITE'*/],
  includeScore: true,
  threshold: 0.3,
});

const getSubcategories = () => {
  const SUBS = PROFESSORSHIPS.map(item => item['SUBCATEGORY']);

  return [...new Set(SUBS)];
};

const getTableDataBySubcategory = (subcategory) =>
PROFESSORSHIPS.filter(item => item['SUBCATEGORY'] === subcategory);


console.log(fuse.search('business'));
console.log(getSubcategories());

export default function Index() {
  const [getCategory, setCategory] = useState('BASS UNIVERSITY FELLOWS IN UNDERGRADUATE EDUCATION PROGRAM');
  const [getSearchResults, setSearchResults] = useState(null);
  const [getSearchTerm, setSearchTerm] = useState('');
  const columns = useMemo(() => [
    {
      Header: "Position",
      accessor: "POSITION",
    },
    {
      Header: "Current Holder",
      accessor: "CURRENT HOLDER",
    },
  ], []);
  const data = useMemo(() => getTableDataBySubcategory(getCategory).map((item, index) => {
    return {
      'POSITION': item['POSITION'],
      'CURRENT HOLDER': item['CURRENT HOLDER'],
      id: index
    }
  }, []));
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

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
        getSearchResults.map(item => {
          return (
            <dl>
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
            {getSubcategories().map(item => (
              <li
                css={{margin: '10px', cursor: 'pointer'}}
                onClick={(event) => setCategory(event.target.innerHTML)}
              >
                <Link to={`/professorships${PROFESSORSHIPS_MAP[item].to}`}>
                  {PROFESSORSHIPS_MAP[item].label}
                </Link>
              </li>
            ))}
          </ul>
          <table {...getTableProps()} css={{ border: 'solid 1px gray' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      css={{
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          css={{
                            padding: '10px',
                            border: 'solid 1px gray',
                          }}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      }
    </>
  );
}