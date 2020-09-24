const express = require('express')
const path = require('path')
const http = require('http')

const socketio = require('socket.io')
const port = 3000

module.exports = class DataTransport {
    constructor() {
        const app = express()
        const server = http.createServer(app)

        server.listen(port, () => console.log('Server listening at port %d', port))

        const io = socketio(server, {
            handlePreflightRequest: (_, res) => this._setHeaders(res)
        });

        io.on('connection', socket => this._onUserConnected(socket))
    }

    _onUserConnected(socket) {
        let numUsers = 0;

        var addedUser = false

        socket.on('new message', (data) => {
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        socket.on('add user', (username) => {
            if (addedUser) return

            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers
            });
        });

        socket.on('disconnect', () => {
            if (addedUser) {
                --numUsers;

                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    }

    _setHeaders(res) {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
}
