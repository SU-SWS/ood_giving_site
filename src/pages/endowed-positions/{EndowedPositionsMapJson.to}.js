import React, { useEffect, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import { useTable } from 'react-table';

import EndowedPositionsNav from '../../components/endowed-positions/EndowedPositionsNav';
import CreateStories from '../../utilities/createStories';
import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';

const getTableDataBySubcategory = (subcategory) =>
  ENDOWED_POSITIONS.filter(item => item['SUBCATEGORY'] === subcategory);

const Professorship = ({ data }) => {
  const DISPLAYED_RESULTS = 25;
  const oodLocalHeader = {
    ...data.header,
    content: JSON.parse(data.header.content),
  };
  const oodLocalFooter = {
    ...data.footer,
    content: JSON.parse(data.footer.content),
  }
  const tableSearchTerm = data.allEndowedPositionsMapJson.edges[0].node.jsonId;
  const [getPage, setPage] = useState(1);
  const [getIndex, setIndex] = useState(0);
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

  const tableData = useMemo(() => {
    const fullArray = getTableDataBySubcategory(tableSearchTerm);
    const paginatedArray = [];
    const total = fullArray.length > DISPLAYED_RESULTS ? DISPLAYED_RESULTS : fullArray.length;
    for (let i = getIndex; i < total * getPage; i++) {
      paginatedArray.push(fullArray[i]);
    }

    return paginatedArray.filter((item) => item !== undefined);
  }, [getIndex, getPage, tableSearchTerm]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  useEffect(() => {
    const newSearch = new URLSearchParams(location.search);

    if (newSearch.get('page')) {
      console.log(Number(newSearch.get('page') - 1) * DISPLAYED_RESULTS);
      setPage(Number(newSearch.get('page')));
      setIndex(Number(newSearch.get('page') - 1) * DISPLAYED_RESULTS);
    }

  }, [location]);

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
