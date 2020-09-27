// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

const transformImage = (image = null, param = null) => {
  const imageService = "//img2.storyblok.com";

  if (image === null) {
    return "";
  }
  else {
    const path = image.replace("https://a.storyblok.com", "");

    if (param === null) {
      return `https:${imageService}${path}`;
    }
    else {
      return `https:${imageService}${param}${path}`;
    }
  }
};

export default transformImage