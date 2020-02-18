import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/cv/styles.scss'

// Parts of the CV page
import body from '../templates/cv/body.pug'
import footer from '../templates/cv/footer.pug'

import me from '../images/cv/me.jpg'

const formatDate = d => {
  let parts = d.split('.'),
    month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][parseInt(parts[1]) - 1];
  return [month, parts.pop()].join(' ');
};

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
    list = jobs.nodes.map(job => Object.assign({}, job.frontmatter, {html: job.html}));

  return <>
    <Helmet>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <title>Óscar Gómez Alcañiz — Curriculum Vitae</title>
    </Helmet>

    {body({jobs: list, images: {me}, formatDate})}

    {footer()}
  </>;
}