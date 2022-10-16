const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

let port = 4000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening on port=${port}`)
});
