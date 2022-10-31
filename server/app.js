const express = require("express");
const {eventEmitter, Events} = require("./events");
const {setUpGraphQlServer} = require("./server-setup/graphql-setup");
const {setUpRestRouting, setUpStaticContent} = require("./server-setup/static-and-rest-setup");
const {setUpGeneral} = require("./server-setup/general-setup");
const {setUpMongoose} = require("./server-setup/mongoose-setup");
const {handleError} = require("./utils/error-handling");

const port = process.env.PORT;
const app = express();

setUpGeneral(app);
setUpMongoose();
setUpGraphQlServer(app);
setUpStaticContent(app);
setUpRestRouting(app);

app.use(handleError);

app.listen(port, () => {
    eventEmitter.emit(Events.ServerStartedListeningOnPort, port);
});
