const http = require('http');
const {Server} = require("socket.io");

const formatMessage = require("./utils/formatMessage");

const {
    addPlayer,
    getAllPlayers,
    getPlayer,
    removePlayer,
} = require("./utils/players");
const {setGame, setGameStatus, getGameStatus} = require("./utils/game");

function setUpSocketIoForTrivia(app) {
    const socketIoPort = process.env.SOCKET_IO_PORT;
    const server = http.createServer(app);    // create the HTTP server using the Express app
    const io = new Server(server);            // connect Socket.IO to the HTTP server

    io.on('connection', socket => {             // listen for new connections to Socket.IO
        console.log('A new connection to Socket.IO');

        socket.on('join', ({playerName, room}, callback) => {
            const {error, newPlayer} = addPlayer({id: socket.id, playerName, room});

            if (error) return callback(error.message);
            callback(); // The callback can be called without data.

            socket.join(newPlayer.room);

            socket.emit('message', formatMessage('Admin', 'Welcome!'));

            socket.broadcast
                .to(newPlayer.room)
                .emit(
                    'message',
                    formatMessage('Admin', `'${newPlayer.playerName}' has joined the game!`)
                );

            // Emit a "room" event to all players to update their Game Info sections
            io.in(newPlayer.room).emit('room', {
                room: newPlayer.room,
                players: getAllPlayers(newPlayer.room),
            });
        });

        socket.on("disconnect", () => {
            let socketId = socket.id;

            console.log(`Socket with id = ${socketId} disconnected.`);

            const disconnectedPlayer = removePlayer(socketId);

            if (disconnectedPlayer) {
                const {playerName, room} = disconnectedPlayer;

                console.log(`Player '${playerName}' disconnected.`);

                io.in(room).emit(
                    "message",
                    formatMessage("Admin", `'${playerName}' has left!`)
                );

                io.in(room).emit("room", {
                    room,
                    players: getAllPlayers(room),
                });
            }
        });

        socket.on("sendMessage", (message, callback) => {
            const {error, player} = getPlayer(socket.id);

            if (error) return callback(error.message);

            if (player) {
                io.to(player.room).emit(
                    "message",
                    formatMessage(player.playerName, message)
                );
                callback(); // invoke the callback to trigger event acknowledgment
            }
        });

        socket.on("getQuestion", async (data, callback) => {
            const {error, player} = getPlayer(socket.id);

            if (error) return callback(error.message);

            if (player) {
                // Pass in a callback function to handle the promise that's returned from the API call
                const game = await setGame();
                io.to(player.room).emit('question', {
                    playerName: player.playerName,
                    ...game.prompt,
                });
            }
        });

        socket.on("sendAnswer", (answer, callback) => {
            const {error, player} = getPlayer(socket.id);

            if (error) return callback(error.message);

            if (player) {
                const {isRoundOver} = setGameStatus({
                    event: "sendAnswer",
                    playerId: player.id,
                    room: player.room,
                });

                // Since we want to show the player's submission to the rest of the players,
                // we have to emit an event (`answer`) to all the players in the room along
                // with the player's answer and `isRoundOver`
                io.to(player.room).emit("answer", {
                    ...formatMessage(player.playerName, answer),
                    isRoundOver,
                });

                callback();
            }
        });

        socket.on("getAnswer", (data, callback) => {
            const {error, player} = getPlayer(socket.id);

            if (error) return callback(error.message);

            if (player) {
                const {correctAnswer} = getGameStatus({
                    event: "getAnswer",
                });
                io.to(player.room).emit(
                    "correctAnswer",
                    formatMessage(player.playerName, correctAnswer)
                );
            }
        });

    });

    server.listen(socketIoPort, () => {
        console.log(`Server is up on port ${socketIoPort}.`);
    });
}

module.exports = {
    setUpSocketIoForTrivia
};
