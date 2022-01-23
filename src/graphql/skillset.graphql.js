import {graphql} from 'gatsby';

export const Skillset = graphql`
  fragment Skillset on SkillsetConnection {
    nodes {
      title
      body
      skills {
        name
        items {
          name
          details
        }
      }
    }
  }
`;