const crypto = require("crypto");

/**
 * Enable Pug syntax transform to JSX so we can use Pug for React templates
 */
exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ['babel-loader', 'pug-as-jsx-loader']
        }
      ]
    }
  });
};

exports.onCreatePage = ({actions}) => {
};

exports.onCreateNode = ({node, actions, getNode, createNodeId}) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      node,
      name: 'collection',
      value: getNode(node.parent).sourceInstanceName,
    });

    // Create nodes of custom type
    // https://www.christopherbiscardi.com/post/constructing-query-types-in-themes/
    const {frontmatter} = node;
    const parent = getNode(node.parent);

    actions.createNode({
      ...frontmatter,
      // Required fields.
      id: createNodeId(`${node.id} >>> Job`),
      parent: node.id,
      children: [],
      internal: {
        type: `Job`,
        content: JSON.stringify(frontmatter),
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(frontmatter))
          .digest(`hex`),
        description: `Job Description`
      }
    });

    actions.createParentChildLink({
      parent: parent,
      child: node
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

  actions.createTypes(
    schema.buildObjectType({
      name: `Job`,
      fields: {
        title: {type: `String!`},
        position: {type: `String!`},
        description: {type: `String!`},
        from: {type: `Date!`},
        to: {type: `Date!`},
        body: {
          type: "String!",
          resolve(source, args, context, info) {
            const
              type = info.schema.getType(`MarkdownRemark`),
              mdNode = context.nodeModel.getNodeById({
                id: source.parent
              }),
              resolver = type.getFields()["html"].resolve;

            return resolver(mdNode, {}, context, {
              fieldName: "html"
            });
          }
        },
      },
      interfaces: [`Node`]
    })
  );
};