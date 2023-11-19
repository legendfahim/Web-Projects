const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

// Store users and their respective rooms
const rooms = {}
const users = {};

function addMessageToRoom(room, id, name, text) {
	if(!(room in rooms)) rooms["my_room"] = []
	rooms[room].push({
		username : name, 
		text : text,
		id : id
	})
}

io.on('connection', (socket) => {
    console.log('A user connected');
	
    socket.on('joinRoom', (user_info) => {
        let room = user_info.room
		let username = user_info.user
		
        socket.join(room);
		if(!(room in rooms)) rooms["my_room"] = []
		// console.log(rooms[room])
		
        // Store the user's information
        users[socket.id] = { username : username, room : room };
		
		for (chat of rooms[room]) {
			 socket.emit('message', chat);
		}
        // Welcome message to the user
        socket.emit('message', { id : null, username: null, text: `Welcome, ${user_info.user}!` });
		
        // Broadcast to the room that a new user has joined
        socket.broadcast.to(user_info.room).emit('message', { id : null, username: null, text: `${user_info.user} has joined the room!` });
	});
	
    // Listen for incoming chat messages
    socket.on('sendMessage', (data) => {
        const user = users[socket.id];
        if (user) {
            io.to(user.room).emit('message', { id : socket.id, username: user.username, text: data.message });
			addMessageToRoom(user.room, socket.id, user.username, data.message)
		}
		console.log(rooms)
	});
	
    // Handle disconnect
    socket.on('disconnect', () => {
        const user = users[socket.id];
		
        if (user) {
            io.to(user.room).emit('message', { username: null, text: `${user.username} has left the room.` });
            delete users[socket.id];
		}
	});
});

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});