const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
// const { default: ACTIONS } = require('../client/src/socket/actions.js')
// import ACTIONS from '../client/src/socket/actions.js';
const cors = require('cors')
const bodyparser = require('body-parser')
const compiler = require('compilex')
const options = { stats: true }
compiler.init(options)

const server = http.createServer(app)
const io = new Server(server)

app.use(bodyparser.json())
app.use(cors())

//?APIs for Compilation...

app.get('/', (req, res) => {
    compiler.flush(() => console.log('deleted'))
})

app.post('/compile', (req, res) => {

    const code = req.body.code
    const input = req.body.input
    const lang = req.body.lang

    try {

        //?starting of switch statement
        switch (lang) {
            case "c":
                if (!input) {
                    var envData = { OS: "windows", cmd: "g++" };

                    compiler.compileCPP(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows", cmd: "g++" };

                    compiler.compileCPPWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;

            case "cpp":
                if (!input) {
                    var envData = { OS: "windows", cmd: "g++" };

                    compiler.compileCPP(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows", cmd: "g++" };

                    compiler.compileCPPWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;

            case "java":
                if (!input) {
                    var envData = { OS: "windows" };

                    compiler.compileJava(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows" };

                    compiler.compileJavaWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;

            case "py":
                if (!input) {
                    var envData = { OS: "windows" };

                    compiler.compilePython(envData, code, function (data) {
                        res.send(data);
                    });
                } else {
                    var envData = { OS: "windows" };

                    compiler.compilePythonWithInput(envData, code, input, function (data) {
                        res.send(data);
                    });
                }
                break;

            default:
                res.send({ message: "Language execution not available for now '_'" })
                break;
        }
        //?ending of switch statement

    } catch (error) {
        console.log(error)
    }

})


//?Socket.io APIs..
const userSocketMap = {};

function getAllConnectedClients(playgroundId) {
    return Array.from(io.sockets.adapter.rooms.get(playgroundId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],

        }
    })
}

io.on('connection', (socket) => {
    console.log('socket connected -> ', socket.id);

    import('../client/src/socket/actions.js').then(module => {
        const ACTIONS = module.default || module;

        socket.on(ACTIONS.JOIN, ({ playgroundId, username }) => {
            userSocketMap[socket.id] = username
            socket.join(playgroundId)
            const clients = getAllConnectedClients(playgroundId)
            // console.log(clients)
            clients.forEach(({ socketId }) => {
                io.to(socketId).emit(ACTIONS.JOINED, {
                    clients,
                    username,
                    socketId: socket.id,
                })
            })

        })

        socket.on('disconnecting', () => {
            const playgrounds = [...socket.rooms]

            playgrounds.forEach((playgroundId) => {
                socket.in(playgroundId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: userSocketMap[socket.id],
                });
            })
            
            delete userSocketMap[socket.id];
            socket.leave();
            console.log('Disconnected -> ', socket.id)

        })

    }).catch(error => {
        console.error('Error importing module:', error);
    });

})



const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))