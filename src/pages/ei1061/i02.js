import React from "react";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { graphql } from "gatsby";

// Styles
import "@css/ei1061.scss";

// Templates
import body from "@templates/ei1061/i02/body.pug";

const GlobalStyle = createGlobalStyle`
body {
  background: #fafafa;
}

li {
  margin-bottom: .8em;
}

blockquote {
  margin-top: .8em;
}
`;

export const query = graphql`
  query I02Site {
    site {
      ...Site
    }
  }
`;

const I02 = ({ data }) => (
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>EI1061 &mdash; Entregable i02 (@{data.site.siteMetadata.title})</title>
    </Helmet>

    <GlobalStyle />
    {body()}
  </>
);

export default I02;
