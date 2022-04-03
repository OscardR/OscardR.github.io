import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { createGlobalStyle } from "styled-components";

// Components
import { LinksList } from "@components/links-list";

// Templates
import body from "@templates/404.pug";

export const query = graphql`
  query FourOhFourPage {
    site {
      ...Site
    }
    linkCollection: allFile(
      filter: { name: { eq: "links" }, relativeDirectory: { eq: "" } }
    ) {
      ...Links
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

const NotFound = ({ data }) => {
  const { site, linkCollection } = data,
    meta = site.siteMetadata,
    links = linkCollection.nodes.reduce(
      (allLinks, node) => allLinks.concat(node.links),
      []
    );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
        <meta
          name="description"
          content="oscardr.github.io : Personal Page on GitHub"
        />

        <title>OscardR.github.io v{meta.version}: 404 Not Found</title>
      </Helmet>

      <GlobalStyle />

      {body({
        links,
        LinksList
      })}
    </>
  );
};

export default NotFound;
