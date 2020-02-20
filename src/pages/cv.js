import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

// Styles
import '../css/stylesheet.sass'
import '../css/cv/styles.scss'

// Parts of the CV page
import body from '../templates/cv/body.pug'
import footer from '../templates/cv/footer.pug'

import me from '../images/cv/me.jpg'

export const query = graphql`
  query SiteAndData {
    site {
      siteMetadata {
        description
        siteUrl
        tagLine
        title
        version
      }
    }
    jobs: allJob(sort: {fields: from, order: DESC}) {
      nodes {
        body
        from(formatString: "MMMM YYYY")
        id
        description
        position
        title
        to(formatString: "MMMM YYYY")
      }
    }
    education: allEducation(sort: {fields: from, order: DESC}) {
      nodes {
        body
        location
        from(formatString: "YYYY")
        title
        to(formatString: "YYYY")
      }
    }
  }
`;

export default ({data}) => {
  const
    {site, jobs, education} = data,
    {siteMetadata: meta} = site;

  return <>
    <Helmet>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <title>Óscar Gómez Alcañiz — Curriculum Vitae</title>
    </Helmet>

    {body({
      jobs: jobs.nodes,
      education: education.nodes,
      images: {me}
    })}

    {footer()}
  </>;
}