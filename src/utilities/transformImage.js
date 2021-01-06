// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

const transformImage = (image, param = null) => {
  const imageService = "//img2.storyblok.com";

  if (image === null) {
    return "";
  }
  else {
    const path = image.replace("https://a.storyblok.com", "");

    // If the image is a jpg, optimize it by changing the quality to 60% (quality loss is mostly unnoticeable)
    if (image.endsWith(".jpg")) {
      param = "/filters:quality(60)";
    }

    if (param === null) {
      return `https:${imageService}${path}`;
    }
    else {
      return `https:${imageService}${param}${path}`;
    }
  }
};

export default transformImage
