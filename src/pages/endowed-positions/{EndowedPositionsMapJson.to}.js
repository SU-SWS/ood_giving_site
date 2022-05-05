import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { useTable } from 'react-table';

import EndowedPositionsNav from '../../components/endowed-positions/EndowedPositionsNav';
import CreateStories from '../../utilities/createStories';
import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';

const getTableDataBySubcategory = (subcategory) =>
  ENDOWED_POSITIONS.filter(item => item['SUBCATEGORY'] === subcategory);

const Professorship = ({ data }) => {
  const oodLocalHeader = {
    ...data.header,
    content: JSON.parse(data.header.content),
  };
  const oodLocalFooter = {
    ...data.footer,
    content: JSON.parse(data.footer.content),
  }
  const tableSearchTerm = data.allEndowedPositionsMapJson.edges[0].node.jsonId;
  const columns = useMemo(() => [
    {
      Header: "Title",
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
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsNav />
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
      <CreateStories stories={[oodLocalFooter]} />
    </>
  );
};

export const query = graphql`
  query($id: String) {
    allEndowedPositionsMapJson(
      filter: {id: {eq: $id}}
    ) {
      edges {
        node {
          jsonId
        }
      }
    }
    header: storyblokEntry(field_component: {eq: "oodLocalHeader"}) {
      id
      content
    }
    footer: storyblokEntry(field_component: {eq: "oodLocalFooter"}) {
      id
      content
    }
  }
`;

export default Professorship
