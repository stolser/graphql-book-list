const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {mongoose} = require("mongoose");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(process.env.MONGODB_CONN_URI);
console.log(`Connecting to MongoDB with URI "${process.env.MONGODB_CONN_URI}"...`);
mongoose.connection.once("open", () => {
    console.log(`... successfully connected to MongoDB.`);
});

let port = 4000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening on port=${port}`)
});
