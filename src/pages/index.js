import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

import body from '../templates/index.pug'

export const query = graphql`
  query HomePage {
    site {
      siteMetadata {
        description
        siteUrl
        tagLine
        title
        version
      }
    }
    allLinksJson {
      nodes {
        href
        icon
        title
      }
    }
  }`;

export default ({data}) => {
  const
    {site, allLinksJson} = data,
    meta = site.siteMetadata,
    links = allLinksJson.nodes;

  return <>
    <Helmet>
      <meta
        charSet='utf-8'/>
      <meta
        httpEquiv='X-UA-Compatible'
        content='chrome=1'/>
      <meta
        name='description'
        content='oscardr.github.io : Personal Page on GitHub'/>

      <title>OscardR.github.io v{meta.version}</title>
    </Helmet>

    {body({links})}
  </>
}