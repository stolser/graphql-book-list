const express = require("express");
const {eventEmitter, Events} = require("./events");
const {setUpGraphQlServer} = require("./server-setup/graphql-setup");
const {setUpRestRouting, setUpStaticContent} = require("./server-setup/static-and-rest-setup");
const {setUpGeneral} = require("./server-setup/general-setup");
const {setUpMongoose} = require("./server-setup/mongoose-setup");
const {setUpSocketIo} = require("./server-setup/socketio-setup");
const {handleError} = require("./utils/error-handling");

const app = express();

setUpGeneral(app);
setUpMongoose();
setUpGraphQlServer(app);
setUpStaticContent(app);
setUpRestRouting(app);
setUpSocketIo(app);

app.use(handleError);

const port = process.env.PORT;
app.listen(port, () => {
    eventEmitter.emit(Events.ServerStartedListeningOnPort, port);
});
