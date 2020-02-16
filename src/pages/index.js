import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

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

    <div id="header_wrap" className="outer">
      <header className="inner"><a href="https://github.com/OscardR" id="forkme_banner">View on GitHub</a>
        <h1 id="project_title">{meta.title}</h1>
        <h2 id="project_tagline">{meta.tagLine}</h2>
      </header>
    </div>

    <div id="main_content_wrap" className="outer">
      <section id="main_content" className="inner">
        <nav>
          <ul>
            {links.map(link => <li>
              <i className={`icon-${link.icon}`}/>&ensp;
              <a href={link.href}>{link.title}</a>
            </li>)}
          </ul>
        </nav>
      </section>
    </div>

    <div id="footer_wrap" className="outer">
      <footer className="inner">
        <p>Published with <a href="http://pages.github.com">GitHub Pages</a></p>
      </footer>
    </div>
  </>
}