const {
    GraphQLSchema,
} = require("graphql");

const {GraphQLRootQueries} = require("./rootQueries")
const {GraphQLMutations} = require("./mutations")

const graphQlSchema = new GraphQLSchema({
    query: GraphQLRootQueries,
    mutation: GraphQLMutations
});

module.exports = {
    graphQlSchema
};
