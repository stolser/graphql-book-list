const {mongoose} = require("mongoose");
const {eventEmitter, Events} = require("../events");

function setUpMongoose() {
    const options = {
        autoIndex: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Operations timeout (in ms)
        socketTimeoutMS: 45000, // Close sockets after this period of inactivity (in ms)
    };

    mongoose.connect(process.env.MONGODB_CONN_URI, options);
    console.log(`Connecting to MongoDB with URI "${process.env.MONGODB_CONN_URI}"...`);
    mongoose.connection.once("open", () => {
        eventEmitter.emit(Events.ConnectedToMongoDB);
    });
}

module.exports = {
    setUpMongoose
};
