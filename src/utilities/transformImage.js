// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

import { config } from "./config"

const transformImage = (image, param = null) => {
  const imageService = config.basePath + "cdn/img";

  if (image === null) {
    return "";
  }
  else {
    const path = image.replace("https://a.storyblok.com", "");

    if (param === null) {
      return imageService + path;
    }
    else {
      return imageService + param + path;
    }
  }
};

export default transformImage
