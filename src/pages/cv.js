import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

// Parts of the CV page
import head from '../cv/head.pug'
import body from '../cv/body.pug'
import footer from '../cv/footer.pug'

export const query = graphql`
  query SiteAndJobs {
    site {
      siteMetadata {
        description
        siteUrl
        tagLine
        title
        version
      }
    }
    jobs: allMarkdownRemark(filter: {fields: {collection: {eq: "cv.jobs"}}}) {
      nodes {
        html
        frontmatter {
          description
          position
          from
          title
          to
        }
      }
    }
  }
`;

export default ({data}) => {
  const
    {site, jobs} = data,
    {siteMetadata: meta} = site,
    {nodes} = jobs;

  return <>
    <Helmet>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

      <title>Óscar Gómez Alcañiz — Curriculum Vitae</title>

      <link rel="stylesheet" href="../css/bootstrap.min.css"/>
      <link rel="stylesheet" href="../css/font-awesome.min.css" media="screen"/>
      <link rel="stylesheet" href="css/styles.css" media="screen"/>
    </Helmet>

    {body()}

    {nodes.map(node => {
      const fm = node.frontmatter;

      return Object.keys(fm).map(key =>
        <p>
          <strong>{key}</strong> {fm[key]}
        </p>
      )
    })}

    {footer()}
  </>;
}