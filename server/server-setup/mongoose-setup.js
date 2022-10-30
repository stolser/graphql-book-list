const {mongoose} = require("mongoose");
const {eventEmitter, Events} = require("../events");

function setUpMongoose() {
    mongoose.connect(process.env.MONGODB_CONN_URI);
    console.log(`Connecting to MongoDB with URI "${process.env.MONGODB_CONN_URI}"...`);
    mongoose.connection.once("open", () => {
        eventEmitter.emit(Events.ConnectedToMongoDB);
    });
}

module.exports = {
    setUpMongoose
};
