import {graphql} from 'gatsby';

export const Site = graphql`
  fragment Site on Site {
    siteMetadata {
      description
      siteUrl
      tagLine
      title
      version
    }
  }
`;