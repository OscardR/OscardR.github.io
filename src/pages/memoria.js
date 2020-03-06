import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

// Styles
import '@css/memoria.scss'

// Parts of the Memoria page
import body from '@templates/memoria/body.pug'

export const query = graphql`
  query SiteAgain {
    site {
      ...Site
    }
  }
`;

class Memoria extends React.PureComponent {
  render() {
    const {
        site
      } = this.props.data,
      {siteMetadata: meta} = site;

    return <>
      <Helmet>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <title>Memoria del Trabajo Realizado</title>
      </Helmet>

      {body()}
    </>;
  }
}

export default Memoria;