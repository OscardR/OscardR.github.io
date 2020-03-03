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
  const collectionToContentType ={
    'cv.jobs': `Job`,
    'cv.education': `Education`,
    'cv.information': `Information`
  };

  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      node,
      name: 'collection',
      value: getNode(node.parent).sourceInstanceName,
    });

    // Create nodes of custom type
    // https://www.christopherbiscardi.com/post/constructing-query-types-in-themes/
    const {frontmatter} = node;
    const parent = getNode(node.parent),
    contentType = collectionToContentType[node.fields.collection];

    actions.createNode({
      ...frontmatter,
      // Required fields.
      id: createNodeId(`${node.id} >>> ${contentType}`),
      parent: node.id,
      children: [],
      internal: {
        type: contentType,
        content: JSON.stringify(frontmatter),
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(frontmatter))
          .digest(`hex`),
        description: `${contentType} content type, extracted from Markdown sources`
      }
    });

    actions.createParentChildLink({
      parent: parent,
      child: node
    });
  }
};

exports.sourceNodes = ({actions, schema}) => {
  /**
   * This field resolver is used to extract the HTML data from MarkdownRemark nodes
   * @type {{resolve(*, *, *=, *): *, type: string}}
   */
  const bodyFieldResolver = {
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
  };

  actions.createTypes(
    schema.buildObjectType({
      name: `Job`,
      fields: {
        title: {type: `String!`},
        position: {type: `String!`},
        description: {type: `String!`},
        from: {type: `Date!`},
        to: {type: `Date`},
        body: bodyFieldResolver,
      },
      interfaces: [`Node`]
    })
  );

  actions.createTypes(
    schema.buildObjectType({
      name: `Education`,
      fields: {
        title: {type: `String!`},
        location: {type: `String!`},
        from: {type: `Date!`},
        to: {type: `Date`},
        body: bodyFieldResolver,
      },
      interfaces: [`Node`]
    })
  );
};