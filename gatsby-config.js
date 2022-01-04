/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `gomez.host`,
    tagLine: `Óscar Gómez Alcañiz's personal website`,
    siteUrl: `https://oscar.gomez.host`,
    description: `Personal site, built with Gatsby`,
    version: `2.0.0`,
  },
  plugins: [
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
        extensions: ["js", "pug", "scss"],
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-graphql-loader`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/skills`,
        name: "cv.skillset",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/jobs`,
        name: "cv.jobs",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/education`,
        name: "cv.education",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/cv/information`,
        name: "cv.information",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: "structure",
      },
    },
  ],
};
