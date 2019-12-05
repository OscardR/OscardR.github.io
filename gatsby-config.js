/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `OscardR`,
    tagLine: `Homepage @ GitHub`,
    siteUrl: `https://oscardr.github.io`,
    description: `This is a test to migrate OscardR.github.io to Gatsby`,
    version: `1.0.0`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ]
};
