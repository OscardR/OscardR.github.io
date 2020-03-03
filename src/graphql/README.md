# Note about GraphQL

GatsbyJS can't import GraphQL fragments from separated `.graphql` files just yet.

The workaround is to export these fragments as GraphQL queries in JS files. Gatsby will automatically run the queries 
and make them globally available. This way they can be referenced from anywhere.