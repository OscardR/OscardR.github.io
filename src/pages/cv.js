import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

// Parts of the CV page
import head from '../cv/head.pug'
import body from '../cv/body.pug'
import footer from '../cv/footer.pug'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../cv/css/styles.scss'

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
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

      <title>Óscar Gómez Alcañiz — Curriculum Vitae</title>
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