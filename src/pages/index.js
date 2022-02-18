import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

// Components
import { LinksList } from "@components/links-list";

// Templates
import body from "@templates/index.pug";

export const query = graphql`
  query HomePage {
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

const Index = ({ data }) => {
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
          content="{meta.description}"
        />

        <title>{meta.title} v{meta.version}</title>
      </Helmet>

      {body({
        meta,
        links,
        LinksList,
      })}
    </>
  );
};

export default Index;
