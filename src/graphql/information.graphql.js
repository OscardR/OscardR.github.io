import {graphql} from 'gatsby';

export const InformationFields = graphql`
  fragment InformationFields on Query {
    informationFields: __type(name: "Information") {
      fields {
        name
      }
    }
  }
`;

export const Information = graphql`
  fragment Information on InformationConnection {
    nodes {
      Born_in
      Date_of_Birth
      Email
      Gender
      Name
      Nationality
      Skype
      title: parent {
        ... on MarkdownRemark {
          html
        }
      }
    }
  }
`;