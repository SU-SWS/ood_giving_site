import React from 'react';
import CreateBloks from '../utilities/createBloks';

const Page = (props) => (
  <div className="page">
    <CreateBloks blokSection={props.blok.body} />
  </div>
);

export default Page;
