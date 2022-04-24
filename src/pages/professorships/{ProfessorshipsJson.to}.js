import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { useTable } from 'react-table';

import PROFESSORSHIPS from '../../fixtures/professorships.json';

const getTableDataBySubcategory = (subcategory) =>
  PROFESSORSHIPS.filter(item => item['SUBCATEGORY'] === subcategory);

const Professorship = ({ data }) => {
  const tableSearchTerm = data.allProfessorshipsJson.edges[0].node.jsonId;
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
  const tableData = useMemo(() => getTableDataBySubcategory(tableSearchTerm).map((item, index) => {
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
  } = useTable({ columns, data: tableData });
  return (
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
  );
};

export const query = graphql`
  query($id: String) {
    allProfessorshipsJson(
      filter: {id: {eq: $id}}
    ) {
      edges {
        node {
          jsonId
        }
      }
    }
  }
`;

export default Professorship
