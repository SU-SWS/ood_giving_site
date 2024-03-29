import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import CenteredContainer from '../partials/centeredContainer';
import FlexCell from '../partials/flexCell';

const OodLocalFooter = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-local-footer su-bg-white">
      <CenteredContainer>
        <div className="ood-local-footer__header">
          <CreateBloks blokSection={props.blok.websiteLogo} />
        </div>
        <section className="flex-container ood-local-footer__content">
          <FlexCell md={6} xl={3} classes={'ood-local-footer__cell'}>
            {props.blok.contactHeading && (
              <h2 className="ood-local-footer__list-heading su-serif">
                {props.blok.contactHeading}
              </h2>
            )}
            <address className="ood-local-footer__address">
              {props.blok.addressLine1 && (
                <span>{props.blok.addressLine1}</span>
              )}
              {props.blok.addressLine2 && (
                <span>{props.blok.addressLine2}</span>
              )}
              {props.blok.addressLine3 && (
                <span>{props.blok.addressLine3}</span>
              )}
              {props.blok.phone && <span>{props.blok.phone}</span>}
              {props.blok.email && (
                <a href={`mailto:${props.blok.email}`}>{props.blok.email}</a>
              )}
            </address>
            <CreateBloks blokSection={props.blok.cta} />
          </FlexCell>
          <FlexCell md={6} xl={3} classes={'ood-local-footer__cell'}>
            <nav aria-label="Local footer Office of Development links">
              {props.blok.headingGroupOod && (
                <h2 className="ood-local-footer__list-heading su-serif">
                  {props.blok.headingGroupOod}
                </h2>
              )}
              <ul className="ood-local-footer__link-list">
                <CreateBloks blokSection={props.blok.linkGroupOod} />
              </ul>
            </nav>
          </FlexCell>
          <FlexCell md={6} xl={3} classes={'ood-local-footer__cell'}>
            <nav aria-label="Local footer Make a Gift links">
              {props.blok.headingGroupGift && (
                <h2 className="ood-local-footer__list-heading su-serif">
                  {props.blok.headingGroupGift}
                </h2>
              )}
              <ul className="ood-local-footer__link-list">
                <CreateBloks blokSection={props.blok.linkGroupGift} />
              </ul>
            </nav>
            <h2 className="ood-local-footer__list-heading su-serif">Tax ID</h2>
            <p>{props.blok.taxId}</p>
          </FlexCell>
          <FlexCell md={6} xl={3} classes={'ood-local-footer__cell'}>
            <nav aria-label="Local footer information links">
              {props.blok.headingGroupInfo && (
                <h2 className="ood-local-footer__list-heading su-serif">
                  {props.blok.headingGroupInfo}
                </h2>
              )}
              <ul className="ood-local-footer__link-list">
                <CreateBloks blokSection={props.blok.linkGroupInfo} />
              </ul>
            </nav>
          </FlexCell>
        </section>
      </CenteredContainer>
    </div>
  </SbEditable>
);

export default OodLocalFooter;
