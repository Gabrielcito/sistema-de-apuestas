import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express();
app.use(express.json());
app.use(cors());

/*
const rooms = {
    code: {
        players: [
            {
                playerId: 'uniquePlayerId',
                userName: 'playerName',
                socketId: 'socketIdValue'
            },
        ]
    }
}*/

const rooms = {}

//rutas
app.post("/getCode", async (req, res) => {
    const code = uuidv4().slice(0, 6).toUpperCase();

    if(!code){
        return res.status(500).json({ error: "Error al crear codigo"})
    }

    rooms[code] = {players: []};
    return res.status(201).json({ code: code })
    
})
//

//webSocket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.on('admin_session_join', (args) => {
        const [ code ] = args;

        socket.join(code)
    })

    socket.on('session_join', (args) => {
    
        const [ code, name, userId ] = args

        if(!rooms[code]){
            socket.emit('error', { message: "La sala no existe "});
            return        
        }

        const player = {
            name: name,
            userId: userId,
            socketId: socket.id
        }

        const reconect_player = rooms[code].players.find(player => player.userId === userId)

        if(reconect_player){
            socket.join(code);
            reconect_player.socketId = socket.id;
            io.to(code).emit('player_list', rooms[code].players)
            return 
        }

        socket.join(code);
        rooms[code].players.push(player)
        io.to(code).emit('player_list', rooms[code].players)
    
    })


    socket.on('session_disconnect', () => {
        
        for(const code in rooms){
            rooms[code].players = rooms[code].players.filter((player) => player.socketId !== socket.id);
            io.to(code).emit('player_list', rooms[code].players);       
        }

    
    })


})


//


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})