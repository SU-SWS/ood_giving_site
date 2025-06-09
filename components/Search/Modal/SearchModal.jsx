import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Modal from '../../layout/Modal/Modal';
import SearchFieldModal from './SearchFieldModal';
import SearchSuggestions from '../SearchSuggestions';
import SearchModalContext from './SearchModalContext';

const SearchModal = () => {
  const { isOpen, close, modalSearchInputRef } = useContext(SearchModalContext);

  const data = useStaticQuery(graphql`
    {
      storyblokEntry(
        full_slug: {
          eq: "search-configuration/search-modal/search-suggestions"
        }
      ) {
        field_title_string
        content
      }
    }
  `);

  let story;
  let content;
  let introduction;
  let emptySearchMessage;

  if (data && data?.storyblokEntry?.content) {
    story = data.storyblokEntry;
    content = JSON.parse(story.content);
    introduction = content.introduction;
    emptySearchMessage = content.emptySearchMessage;
  }

  const onClose = () => {
    close();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocus={modalSearchInputRef}
      ariaLabel="Search Stanford Alumni websites"
    >
      <Container>
        <div className="su-max-w-1000 su-mx-auto">
          <Heading
            font="serif"
            size={3}
            level={2}
            align="center"
            className="su-text-white su-mt-80 su-mb-61 md:su-rs-mb-4"
          >
            {introduction}
          </Heading>
          <SearchFieldModal
            emptySearchMessage={emptySearchMessage}
            ref={modalSearchInputRef}
          />
          {story && content && (
            <div className="su-rs-pb-7">
              <SearchSuggestions blok={content} />
            </div>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default SearchModal;
