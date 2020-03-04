import {graphql} from 'gatsby';

export const Links = graphql`
  fragment Links on LinksJsonConnection {
    nodes {
      href
      icon
      title
    }
  }
`;