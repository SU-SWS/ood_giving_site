import React, { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { useTable } from 'react-table';

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

const getTableDataBySubcategory = (subcategory) =>
PROFESSORSHIPS.filter(item => item['SUBCATEGORY'] === subcategory);

export default function Medicine() {
  const [getCategory, setCategory] = useState('STANFORD MEDICINE');
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
      
      {!getSearchResults &&
        <>
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