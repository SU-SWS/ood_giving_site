// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

import { config } from "./config";

const transformImage = (image, param = null) => {
  let imageService = "https://img2.storyblok.com";

  if (config.isNetlify) {
    imageService = config.assetCdn + "i";
  }

  if (image === null) {
    return "";
  } else {
    const path = image.replace("https://a.storyblok.com", "");

    // If the image is a jpg, optimize it by changing the quality to 60% (quality loss is mostly unnoticeable)
    if (image.endsWith(".jpg")) {
      param += "/filters:quality(60)";
    }

    if (param === null) {
      return imageService + path;
    } else {
      return imageService + param + path;
    }
  }
};

export default transformImage;
