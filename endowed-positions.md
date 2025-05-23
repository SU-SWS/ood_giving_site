# Endowed Positions

Endowed Positions is a subsection of the Stanford Giving site. 

The main route `/endowed-positions` is a page built via Storyblok. The sub-routes are built and controlled via Gatsby. Each school, center, institute, or program has its own sub-route i.e., `/endowed-positions/graduate-school-of-business`. Schools/centers are added or removed via [ENDOWED_POSITIONS_MAP.json](https://github.com/SU-SWS/ood_giving_site/blob/dev/src/constants/ENDOWED_POSITIONS_MAP.json).

Search results are another sub-route i.e., `/endowed-positions/search?term=james`. This route will provide list of results of which each one is clickable. When one of the results is clicked a query param of the results' index is appended and the UI is changed to show only that result. There were potential plans to expand this but this functionality matched that of the previous Endowed Positions site. Search is powered by [Fuse.js](https://www.fusejs.io/).

## Endowed Positions Files

- [React component files](https://github.com/SU-SWS/ood_giving_site/tree/dev/src/components/endowed-positions)
- [Dataset JSON](https://github.com/SU-SWS/ood_giving_site/blob/dev/src/fixtures/endowedPositions.json)
- [School/Center Map JSON](https://github.com/SU-SWS/ood_giving_site/blob/dev/src/constants/ENDOWED_POSITIONS_MAP.json)

## Updating the Endowed Positions dataset

The Endowed Positions dataset is updated about 6 times a year. Every few months an updated csv will be provided and the site will need the updated data from the csv. The following are steps to update the site data once a new csv is received:

1. Convert CSV to JSON ([csvjson](https://csvjson.com/csv2json))
2. Update [endowedPositions.json](https://github.com/SU-SWS/ood_giving_site/blob/dev/src/fixtures/endowedPositions.json)
3. Update the footer ([EndowedPositionsFooter.js](https://github.com/SU-SWS/ood_giving_site/blob/dev/src/components/endowed-positions/EndowedPositionsFooter.js))

* [Sample PR](https://github.com/SU-SWS/ood_giving_site/pull/484) 
