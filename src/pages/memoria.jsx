import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { createGlobalStyle } from "styled-components";

// Styles
import "@css/memoria.scss";

// Parts of the Memoria page
import body from "@templates/memoria/body.pug";

export const query = graphql`
  query SiteAgain {
    site {
      ...Site
    }
  }
`;

const GlobalStyle = createGlobalStyle`
body {
  background: #fafafa;
}

p {
  max-width: max-content;
}

code {
  margin: 0 3px;
  padding: .2em .3em;
  border-radius: .25em;
  color: darkred;
}
`;

class Memoria extends React.PureComponent {
  render() {
    const { site } = this.props.data,
      { siteMetadata: meta } = site;

    return (
      <>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Memoria del Trabajo Realizado ({meta.title})</title>
        </Helmet>

        <GlobalStyle />

        {body()}
      </>
    );
  }
}

export default Memoria;
