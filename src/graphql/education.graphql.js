import {graphql} from 'gatsby';

export const Education = graphql`
  fragment Education on EducationConnection {
    nodes {
      body
      location
      from(formatString: "YYYY")
      title
      to(formatString: "YYYY")
    }
  }
`;