// next.config.js
const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

// pwa integration
const withOffline = require('next-offline');

module.exports = withPlugins([
  [withSass],
  [withImages],
  [withOffline],
  {
    publicRuntimeConfig: {
      // Will be available on both server and client
      baseURL: "https://chital.sumpahpalapa.com/",
      // baseURL: 'http://chital.dev.id:7080/',
      apiEndpoints: "api/v1/",
      partner: "sepulsa",
      partnerId: 10,
      blogContentUrl:
        "https://www.sepulsa.com/blog/wp-json/wp/v2/posts?per_page=3",
      blogImageUrl: "https://www.sepulsa.com/blog/wp-json/wp/v2/media/"
    }
  }
]);
