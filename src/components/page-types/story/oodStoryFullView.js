import SbEditable from "storyblok-react";
import React from "react";
import IconCardSection from "../../partials/iconCardSection";
import Footer from "../../partials/footer";
import SeoSocial from "../../partials/seoSocial";
import CreateBloks from "../../../utilities/createBloks";
import CenteredContainer from "../../partials/centeredContainer";
import BelowContent from "../../partials/belowContent";
import Heading from "../../partials/heading";
import FlexCell from "../../partials/flexCell";
import FullWidthImage from "../../media/fullWidthImage";

const StoryFullView = props => {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let publishedDate;

  if (props.blok.publishedDate) {
    publishedDate = new Date(props.blok.publishedDate).toLocaleDateString(
      "en-US",
      dateOptions
    );
  } else if (props.blok.manualDate) {
    publishedDate = props.blok.manualDate;
  }

  return (
    <SbEditable content={props.blok}>
      <SeoSocial {...props} />
      <CreateBloks blokSection={props.blok.localHeader} />
      <main id="main-content">
        <article className={`ood-story su-bg-white`}>
          <header
            className={`ood-story__header
                    ${
                      props.blok.heroImage.filename?.startsWith("http") &&
                      props.blok.displayImage === "show-image"
                        ? "ood-story__header--has-image su-bg-white"
                        : `ood-story__header--no-image su-bg-white su-border-color-${props.blok.headerBackgroundColor}`
                    }
            `}
          >
            {props.blok.heroImage.filename?.startsWith("http") &&
              props.blok.displayImage === "show-image" && (
                <FullWidthImage
                  {...props}
                  filename={props.blok.heroImage.filename}
                  classPrefix={"ood-story"}
                  visibleVertical={props.blok.visibleVertical}
                  visibleHorizontal={"center"}
                  alt={props.blok.heroImage.alt ?? ""}
                />
              )}
            <CenteredContainer
              flex={true}
              classes={"ood-story__header-content"}
            >
              <FlexCell
                md={12}
                lg={10}
                xxl={9}
                classes={`ood-story__header-content-wrapper
                     su-bg-${props.blok.headerBoxColor}
                     ${
                       props.blok.headerBoxColor !== "white" &&
                       props.blok.headerBoxColor !== "fog-light"
                         ? "su-text-white"
                         : ""
                     }
                     `}
              >
                <Heading
                  level={"h1"}
                  weight={"semibold"}
                  classes={`ood-story__title ood-has-tab-before su-before-bg-${props.blok.tabColor}`}
                >
                  {props.blok.title}
                </Heading>
                {props.blok.intro && (
                  <p className="intro-text ood-story__intro-text">
                    {props.blok.intro}
                  </p>
                )}
              </FlexCell>
            </CenteredContainer>
          </header>
          <div className="ood-story__content">
            <CreateBloks blokSection={props.blok.storyContent} />
          </div>
          <footer className="ood-story__main-footer">
            {(props.blok.author || publishedDate) && (
              <div className="ood-story__metadata">
                <CenteredContainer flex={true}>
                  <FlexCell lg={8} classes="su-mx-auto">
                    <CreateBloks blokSection={props.blok.cta} />
                    <div className="ood-story__metadata su-pb-5">
                      {props.blok.author && (
                        <>
                          <p className="ood-story__metadata-title su-bold su-uppercase">
                            Author
                          </p>
                          <span className="ood-story__metadata-data">
                            {props.blok.author}
                          </span>
                        </>
                      )}
                      {publishedDate && (
                        <>
                          <p className="ood-story__metadata-title su-bold su-uppercase">
                            Date
                          </p>
                          <span className="ood-story__metadata-data su-mb-none">
                            {publishedDate}
                          </span>
                        </>
                      )}
                    </div>
                  </FlexCell>
                </CenteredContainer>
              </div>
            )}
            <BelowContent {...props} />
            <IconCardSection {...props} />
          </footer>
        </article>
      </main>
      <Footer {...props} />
    </SbEditable>
  );
};

export default StoryFullView;
