import { graphql } from "gatsby";

export const Links = graphql`
  fragment Links on FileConnection {
    nodes {
      links: childrenYaml {
        href
        icon
        title
      }
      path: relativeDirectory
    }
  }
`;
