import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'
import Components from "../components"
import IconCardSection from '../partials/iconCardSection'
import Footer from "../partials/footer";
import StoryCardView from "./oodStoryCardView";
import StoryFullView from "./oodStoryFullView";
import { Helmet } from 'react-helmet';

const OodStory = (props) => {
  let processedHeroImg;
  processedHeroImg = transformImage(props.blok.heroImage.filename, "/2000x0");

  const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const formattedPublishedDate = new Date(props.blok.publishedDate).toLocaleDateString("en-US", dateOptions);

  if (props.layout === "story-card") {
    return (
      <StoryCardView {...props} />
    )
  }
  else {
    return (
      <StoryFullView {...props} />
    )
  }
};

export default OodStory
