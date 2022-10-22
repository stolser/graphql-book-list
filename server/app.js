const express = require("express");
const cors = require('cors');
const {graphqlHTTP} = require("express-graphql");
const {mongoose} = require("mongoose");
const {graphQlSchema} = require("./graphql/schema");
const {eventEmitter, Events} = require("./events");

const graphQlPort = 4000;
const graphQlPath = '/graphql';
const app = express();

mongoose.connect(process.env.MONGODB_CONN_URI);
console.log(`Connecting to MongoDB with URI "${process.env.MONGODB_CONN_URI}"...`);
mongoose.connection.once("open", () => {
    eventEmitter.emit(Events.ConnectedToMongoDB);
});

app.use(cors());

app.use(graphQlPath, graphqlHTTP({
        schema: graphQlSchema,
        graphiql: true
    })
);

app.listen(graphQlPort, () => {
    eventEmitter.emit(Events.ServerStartedListeningOnPort, graphQlPort);
});
