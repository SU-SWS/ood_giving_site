import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';

type RedirectProps = React.HTMLAttributes<HTMLElement> & {
  blok: SbBlokData & {
    from?: string;
    to?: string;
    statusCode?: string;
    enabled?: boolean;
  };
};

export const Redirect = (props: RedirectProps) => {
  const mapping = {
    'From Path': props.blok.from || 'N/A',
    'To Path': props.blok.to || 'N/A',
    'Status Code': props.blok.statusCode || '301',
    Enabled: props.blok.enabled ? 'TRUE' : 'FALSE',
  };
  const mapEntries = Object.entries(mapping);

  return (
    <article {...storyblokEditable(props.blok)}>
      <section>
        <table>
          <thead>
            <tr>
              {mapEntries.map(([key]) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {mapEntries.map(([key, val]) => (
                <td key={key}>{val}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
};
