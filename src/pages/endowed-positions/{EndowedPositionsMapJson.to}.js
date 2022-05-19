import React, { useEffect, useMemo, useState } from 'react';
import { graphql, Link } from 'gatsby';
import { useTable } from 'react-table';

import EndowedPositionsHeader from '../../components/endowed-positions/EndowedPositionsHeader';
import EndowedPositionsNav from '../../components/endowed-positions/EndowedPositionsNav';
import EndowedPositionsPagination from '../../components/endowed-positions/EndowedPositionsPagination';
import CreateStories from '../../utilities/createStories';
import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';

const getTableDataBySubcategory = (subcategory) =>
  ENDOWED_POSITIONS.filter(item => item['SUBCATEGORY'] === subcategory);

const Professorship = ({ data, location }) => {
  console.log(data);
  const DISPLAYED_RESULTS = 25;
  const oodLocalHeader = {
    ...data.header,
    content: JSON.parse(data.header.content),
  };
  const oodLocalFooter = {
    ...data.footer,
    content: JSON.parse(data.footer.content),
  }
  const {jsonId, label, link} = data?.allEndowedPositionsMapJson?.edges?.[0]?.node || {};
  const tableSearchTerm = jsonId;
  const fullArray = getTableDataBySubcategory(tableSearchTerm);
  const [getPage, setPage] = useState(1);
  const [getIndex, setIndex] = useState(0);
  // Pagination stuff
  const canPaginate = fullArray.length > DISPLAYED_RESULTS;
  const totalPages = canPaginate ? Math.ceil(fullArray.length / DISPLAYED_RESULTS) : 1;
  const pagesArray = Array.from(Array(totalPages).keys());
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
      setPage(Number(newSearch.get('page')));
      setIndex(Number(newSearch.get('page') - 1) * DISPLAYED_RESULTS);
    }

  }, [location]);

  return (
    <>
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsHeader />
      <section class="ood-interior-page__body">
        <div class="centered-container flex-container ood-interior-page__body-container">
          <div class="ood-interior-page__body-content su-mx-auto flex-lg-10-of-12 flex-xl-8-of-12">
            <h2>{label}</h2>
            <p>
              The information presented in the table below is arranged alphabetically by title. Additional information is at <a href={link} title={label}>{label}</a>.
            </p>
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
            {canPaginate && <EndowedPositionsPagination pagesArray={pagesArray} />}
          </div>
        </div>
      </section>
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
          label
          link
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
