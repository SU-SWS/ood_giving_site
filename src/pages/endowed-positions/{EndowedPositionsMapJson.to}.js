import React, { useEffect, useMemo, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import { useTable } from 'react-table';

import EndowedPositionsHeader from '../../components/endowed-positions/EndowedPositionsHeader';
import EndowedPositionsPagination from '../../components/endowed-positions/EndowedPositionsPagination';
import EndowedPositionsFooter from '../../components/endowed-positions/EndowedPositionsFooter';
import CreateStories from '../../utilities/createStories';
import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';

const getTableDataBySubcategory = (subcategory) =>
  ENDOWED_POSITIONS.filter((item) => item['SUBCATEGORY'] === subcategory);

const Professorship = ({ data, location }) => {
  const DISPLAYED_RESULTS = 25;
  const oodLocalHeader = {
    ...data.header,
    content: JSON.parse(data.header.content),
  };
  const oodLocalFooter = {
    ...data.footer,
    content: JSON.parse(data.footer.content),
  };
  const { jsonId, label, link, to } =
    data?.allEndowedPositionsMapJson?.edges?.[0]?.node || {};
  const tableSearchTerm = jsonId;
  const fullArray = getTableDataBySubcategory(tableSearchTerm);
  const [getPage, setPage] = useState(1);
  const [getIndex, setIndex] = useState(0);
  // Pagination stuff
  const canPaginate = fullArray.length > DISPLAYED_RESULTS;
  const totalPages = canPaginate
    ? Math.ceil(fullArray.length / DISPLAYED_RESULTS)
    : 1;
  const pagesArray = Array.from(Array(totalPages).keys());
  const headerRef = useRef(null);
  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'POSITION',
      },
      {
        Header: 'Current Holder',
        accessor: 'CURRENT HOLDER',
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    const paginatedArray = [];
    const total =
      fullArray.length > DISPLAYED_RESULTS
        ? DISPLAYED_RESULTS
        : fullArray.length;
    for (let i = getIndex; i < total * getPage; i++) {
      paginatedArray.push(fullArray[i]);
    }

    return paginatedArray.filter((item) => item !== undefined);
  }, [getIndex, getPage, tableSearchTerm]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  useEffect(() => {
    const newSearch = new URLSearchParams(location.search);

    if (newSearch.get('page')) {
      setPage(Number(newSearch.get('page')));
      setIndex(Number(newSearch.get('page') - 1) * DISPLAYED_RESULTS);
    }
  }, [location]);

  useEffect(() => {
    if (location?.search?.indexOf('page') > -1) {
      headerRef?.current.scrollIntoView();
      headerRef?.current.focus();
    }
  }, [headerRef, location]);

  return (
    <>
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsHeader to={to} />
      <section className="ood-interior-page__body">
        <div className="centered-container flex-container ood-interior-page__body-container">
          <div className="ood-interior-page__body-content su-mx-auto flex-lg-10-of-12 flex-xl-8-of-12">
            <h2 ref={headerRef}>{label}</h2>
            <p>
              The information presented in the table below is arranged
              alphabetically by title.{' '}
              {link && (
                <>
                  Additional information is at{' '}
                  <a href={link} title={label}>
                    {label}
                  </a>
                  .
                </>
              )}
            </p>
            <table>
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th key={index}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr key={index}>
                      {row.cells.map((cell, index) => {
                        if (index === 0) {
                          return (
                            <th key={index} scope="row">
                              {cell.render('Cell')}
                            </th>
                          );
                        }
                        return <td key={index}>{cell.render('Cell')}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {canPaginate && (
              <EndowedPositionsPagination
                currentPage={getPage}
                pagesArray={pagesArray}
              />
            )}
            <EndowedPositionsFooter />
          </div>
        </div>
      </section>
      <CreateStories stories={[oodLocalFooter]} />
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    allEndowedPositionsMapJson(filter: { id: { eq: $id } }) {
      edges {
        node {
          jsonId
          label
          link
          to
        }
      }
    }
    header: storyblokEntry(field_component: { eq: "oodLocalHeader" }) {
      id
      content
    }
    footer: storyblokEntry(field_component: { eq: "oodLocalFooter" }) {
      id
      content
    }
  }
`;

export default Professorship;
