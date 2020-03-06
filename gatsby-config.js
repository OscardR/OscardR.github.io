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
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-graphql-loader`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@": "src/",
          "@components": "src/components",
          "@pages": "src/pages",
          "@images": "src/images",
          "@css": "src/css",
          "@templates": "src/templates",
        },
        extensions: [
          "js", "pug", "scss"
        ],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/jobs`,
        name: 'cv.jobs',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/education`,
        name: 'cv.education',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/information`,
        name: 'cv.information',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'structure',
      },
    }
  ]
};
