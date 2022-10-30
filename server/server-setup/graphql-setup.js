const {graphqlHTTP} = require("express-graphql");
const {graphQlSchema} = require("../graphql/schema");

const graphQlPath = process.env.GRAPHQL_PATH;

function setUpGraphQlServer(app) {
    app.use(graphQlPath, graphqlHTTP({
            schema: graphQlSchema,
            graphiql: true
        })
    );
}

module.exports = {
    setUpGraphQlServer
};
