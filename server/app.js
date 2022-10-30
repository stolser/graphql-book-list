const express = require("express");
const {eventEmitter, Events} = require("./events");
const {setUpGraphQlServer} = require("./server-setup/graphql-setup");
const {setUpRestRouting, setUpStaticContent} = require("./server-setup/static-and-rest-setup");
const {setUpGeneral} = require("./server-setup/general-setup");
const {setUpMongoose} = require("./server-setup/mongoose-setup");

const port = process.env.PORT;
const app = express();

setUpMongoose();
setUpGeneral(app);
setUpGraphQlServer(app);
setUpStaticContent(app);
setUpRestRouting(app);

app.listen(port, () => {
    eventEmitter.emit(Events.ServerStartedListeningOnPort, port);
});
