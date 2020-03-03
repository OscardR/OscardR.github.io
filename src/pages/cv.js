import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

// Components
import LinksList from '../components/links-list'

// Styles
import '../css/styles.scss'
import '../css/cv/styles.scss'

// Parts of the CV page
import body from '../templates/cv/body.pug'

// Resources
import me from '../images/cv/me.jpg'
import cdRaw1 from '../images/cv/cd_raw_1.jpg'
import cdRaw2 from '../images/cv/cd_raw_2.jpg'
import cdRaw3 from '../images/cv/cd_raw_3.jpg'
import sampleCdBack from '../images/cv/sample_cd_back.jpg'
import sampleCdFront from '../images/cv/sample_cd_front.jpg'

// Scripts
import 'bootstrap'
import {setEventHandlers} from '../js/cv'

export const query = graphql`
  query SiteAndData {
    site {
      ...Site
    }
    jobs: allJob(sort: {fields: from, order: DESC}) {
      ...Jobs
    }
    education: allEducation(sort: {fields: from, order: DESC}) {
      ...Schools
    }
    links: allLinksJson {
      ...Links
    }
  }
`;

class CV extends React.PureComponent {
  componentDidMount() {
    // todo: get rid of jQuery
    setEventHandlers();
  }

  render() {
    const {site, jobs, education, links} = this.props.data,
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
        links: links.nodes.filter(link => link.title !== 'My CV'),
        images: {
          me,
          cdRaw1,
          cdRaw2,
          cdRaw3,
          sampleCdBack,
          sampleCdFront
        },
        // Components
        LinksList
      })}
    </>;
  }
}

export default CV;