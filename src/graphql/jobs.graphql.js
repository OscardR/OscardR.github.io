import { graphql } from "gatsby";

export const Jobs = graphql`
  fragment Jobs on JobConnection {
    nodes {
      body
      from(formatString: "MMMM YYYY")
      id
      description
      position
      title
      to(formatString: "MMMM YYYY")
    }
  }
`;
