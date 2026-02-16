import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import { createGlobalStyle } from "styled-components";

// Styles
import "@css/memoria.scss";

// Parts of the Memoria page
import "bootstrap/dist/css/bootstrap.min.css";
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

const Navigation = () => (
  <nav className="memoria-nav">
    <div className="nav-container">
      <Link to="/" className="nav-brand">
        <i className="fas fa-home"></i> Home
      </Link>
      <div className="nav-links">
        <Link to="/cv">CV</Link>
        <Link to="/memoria" className="active">Memoria</Link>
      </div>
    </div>
  </nav>
);

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
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
        </Helmet>

        <GlobalStyle />

        <Navigation />

        {body()}
      </>
    );
  }
}

export default Memoria;
