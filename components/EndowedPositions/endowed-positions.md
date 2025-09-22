# Endowed Positions

Endowed Positions is a subsection of the Stanford Giving site.

The main route `/endowed-positions` is a page built via Storyblok. The sub-routes are built and controlled via Gatsby. Each school, center, institute, or program has its own sub-route, i.e. `/endowed-positions/graduate-school-of-business`. Schools/centers are added or removed via [ENDOWED_POSITIONS_MAP.json](https://github.com/SU-SWS/ood_giving_site/blob/dev/constants/ENDOWED_POSITIONS_MAP.json).

Search results are another sub-route, i.e. `/endowed-positions/search?term=james`. This route will provide a list of results, each of which is clickable. When one of the results is clicked, a query param of the results' index is appended, and the UI is changed to show only that result. There were potential plans to expand this, but this functionality matched that of the previous Endowed Positions site. Search is powered by [Fuse.js](https://www.fusejs.io/).

## Endowed Positions Files

- [React component files](https://github.com/SU-SWS/ood_giving_site/tree/dev/components/endowed-positions)
- [Dataset JSON](https://github.com/SU-SWS/ood_giving_site/blob/dev/fixtures/endowedPositions.json)
- [School/Center Map JSON](https://github.com/SU-SWS/ood_giving_site/blob/dev/constants/ENDOWED_POSITIONS_MAP.json)

## Updating the Endowed Positions dataset

The Endowed Positions dataset is updated about 6 times a year. Every few months, an updated CSV will be provided by the team that manages the data. The site will need the updated data from the CSV. The following are steps to update the site data once a new CSV is received:

1. Convert CSV to JSON using a tool such as ([csvjson](https://csvjson.com/csv2json))
2. Replace the existing data file with the new one, keeping the same name [endowedPositions.json](https://github.com/SU-SWS/ood_giving_site/blob/dev/fixtures/endowedPositions.json)
3. Update the footer's dates. The updated date is the day the developer makes the change. ([EndowedPositionsFooter.js](https://github.com/SU-SWS/ood_giving_site/blob/dev/components/endowed-positions/EndowedPositionsFooter.js))
4. Once updated, create a pull request and send the preview build URL to the approver [Forrest Glick](https://github.com/forrestglick)
5. When approved, merge into the dev branch and cut a release for production
6. Release to production on the date and time agreed upon with the [approver](https://github.com/forrestglick)

* [Sample PR](https://github.com/SU-SWS/ood_giving_site/pull/484)
