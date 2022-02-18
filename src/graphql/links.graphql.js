import {graphql} from 'gatsby';

export const Links = graphql`
  fragment Links on FileConnection {
    nodes {
      links: childrenLinksJson {
        href
        icon
        title
      }
      path: relativeDirectory
    }
  }
`;