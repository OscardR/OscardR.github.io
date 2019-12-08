exports.sourceNodes = ({actions, schema}) => {
  const {createTypes} = actions;

  createTypes(`
    type MarkdownRemarkFrontmatter {
      to: Date
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `);
};