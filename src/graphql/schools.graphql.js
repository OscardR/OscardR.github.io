import {graphql} from 'gatsby';

export const Schools = graphql`
  fragment Schools on EducationConnection {
    nodes {
      body
      location
      from(formatString: "YYYY")
      title
      to(formatString: "YYYY")
    }
  }
`;