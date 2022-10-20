const {EventEmitter} = require("events");

const eventEmitter = new EventEmitter();

const Events = {
    Error: "error",
    ConnectedToMongoDB: "Connected to MongoDB",
    ServerStartedListeningOnPort: "Server started listening on port"
};

eventEmitter.on(Events.ConnectedToMongoDB, () => {
    console.log(`... successfully connected to MongoDB.`);
});

eventEmitter.on(Events.ServerStartedListeningOnPort, (port) => {
    console.log(`Server now listening on port=${port}`);
});

eventEmitter.on(Events.Error, (errorMessage) => {
    console.error(`Error: ${errorMessage}`);
});

module.exports = {
    eventEmitter,
    Events
};
