var io = require('socket.io')();

let users = [];
function getNameByID(id) {
    for (const user of users) {
        if (user.id == id) {
            return user.name
        }
    }
}
function getIdFromName(name) {
    for (const user of users) {
        if (user.name == name) {
            return user.id
        }
    }
}
io.on('connection', (socket) => {
    socket.on('CLIENT_SEND_NAME', (data) => {
        users.push({
            name: data,
            id: socket.id
        })
        io.emit('SERVER_SEND_NAME', {
            message: "Anh " + data + " vua tham gia phong",
            member: users
        })
    })
    socket.on('disconnect', data => {
        let username;
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            if (element.id == socket.id) {
                username = element.name;
                users.splice(index, 1);
            }
        }
        io.emit('SERVER_SEND_DISCONNECT', {
            message: "Anh " + username + " vua roi phong",
            member: users
        })
    })
    socket.on('CLIENT_SEND_MESSAGE', data => {
        if (data.startsWith('/')) {
            let name = data.split(' ')[0];
            name = name.slice(1, name.length);
            let message = data.slice(name.length+2, data.length);
            socket.to(getIdFromName(name)).emit('SERVER_SEND_MESSAGE', {
                message: message,
                to: name,
                from: getNameByID(socket.id)
            })
            socket.emit('SERVER_SEND_MESSAGE', {
                message: message,
                to: name,
                from: getNameByID(socket.id)
            })
        } else {
            io.emit('SERVER_SEND_MESSAGE', {
                message: data,
                to: 'All',
                from: getNameByID(socket.id)
            })
        }

    })
});
module.exports = io;