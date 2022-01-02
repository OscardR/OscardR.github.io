import crypto from "crypto";

/**
 * Enable Pug syntax transform to JSX so we can use Pug for React templates
 */
export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ["babel-loader", "pug-as-jsx-loader"],
        },
      ],
    },
  });
};

export const onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const collectionToContentType = {
    "cv.jobs": `Job`,
    "cv.education": `Education`,
    "cv.information": `Information`,
    "cv.skillset": `Skillset`,
    structure: `Structure`,
  };

  // Add collection field
  const addCollectionField = () => {
    actions.createNodeField({
      node,
      name: "collection",
      value: getNode(node.parent).sourceInstanceName,
    });
  };

  const getContentType = (node) =>
    collectionToContentType[getNode(node.parent).sourceInstanceName];

  if (node.internal.type === `MarkdownRemark`) {
    addCollectionField();

    // Create nodes of custom type
    // https://www.christopherbiscardi.com/post/constructing-query-types-in-themes/
    const { frontmatter } = node,
      contentType = getContentType(node);

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
        description: `${contentType} content type, extracted from Markdown sources`,
      },
    });

    actions.createParentChildLink({
      parent: getNode(node.parent),
      child: node,
    });
  } else if (node.internal.type === `Yaml`) {
    addCollectionField();

    const contentType = getContentType(node);

    let fields = {};
    if (contentType === `Skillset`) {
      const { title, skills } = node;
      fields = { title, skills };
    }

    actions.createNode({
      // Required fields.
      id: createNodeId(`${node.id} >>> ${contentType}`),
      parent: node.id,
      ...fields,
      children: [],
      internal: {
        type: contentType,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fields))
          .digest(`hex`),
        description: `${contentType} content type, extracted from Yaml sources`,
      },
    });

    actions.createParentChildLink({
      parent: getNode(node.parent),
      child: node,
    });
  }
};

/**
 * This field resolver is used to extract the HTML data from MarkdownRemark nodes
 * @type {{resolve(*, *, *=, *): *, type: string}}
 */
const bodyFieldResolver = {
  type: "String",
  resolve(source, args, context, info) {
    const type = info.schema.getType(`MarkdownRemark`),
      mdNode = context.nodeModel.getNodeById({
        id: source.parent,
      }),
      resolver = type.getFields()["html"].resolve;

    return resolver(mdNode, {}, context, {
      fieldName: "html",
    });
  },
};

export const createSchemaCustomization = ({ actions, schema }) => {
  const { createFieldExtension, createTypes } = actions;
  createFieldExtension({
    name: "bodyField",
    extend(options, prevFieldConfig) {
      return bodyFieldResolver;
    },
  });

  const datesType = {
    from: {
      type: `Date!`,
      extensions: {
        dateformat: {
          formatString: "MMM YYYY",
          locale: "en_EN",
        },
      },
    },
    to: {
      type: `Date`,
      extensions: {
        dateformat: {
          formatString: "MMM YYYY",
          locale: "en_EN",
        },
      },
    },
  };

  const jsonType = {
    title: { type: `String!` },
    body: bodyFieldResolver,
  };

  createTypes(
    schema.buildObjectType({
      name: `Job`,
      extensions: { infer: true },
      fields: {
        ...jsonType,
        ...datesType,
        position: { type: `String` },
        description: { type: `String` },
      },
      interfaces: [`Node`],
    })
  );

  createTypes(
    schema.buildObjectType({
      name: `Education`,
      extensions: { infer: true },
      fields: {
        ...jsonType,
        ...datesType,
        location: { type: `String!` },
      },
      interfaces: [`Node`],
    })
  );

  createTypes(`
    """
    Skillset Definition
    """
    type Skillset implements Node @dontInfer {
      title: String!
      body: String @bodyField
      skills: [Skill!]
    }

    type Skill implements Node @dontInfer {
      name: String!
      items: [SkillItem!]!
    }
    
    type SkillItem implements Node @dontInfer {
      name: String!
      details: [String!]
    }
    `);
};
