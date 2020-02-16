/**
 * Enable Pug syntax transform to JSX so we can use Pug for React templates
 */
exports.onCreateWebpackConfig = ({actions}) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: ['babel-loader','pug-as-jsx-loader']
                }
            ]
        }
    });
};

exports.onCreatePage = ({actions}) => {

};

exports.onCreateNode = ({node, actions, getNode}) => {
    if (node.internal.type === `MarkdownRemark`) {
        actions.createNodeField({
            node,
            name: 'collection',
            value: getNode(node.parent).sourceInstanceName,
        });
    }
};

exports.sourceNodes = ({actions, schema}) => {
    actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String!
      from: Date!
      to: Date
      description: String!
      position: String!
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `);
};