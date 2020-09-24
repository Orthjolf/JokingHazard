import io from "socket.io-client";

export default class DataTransport {
    constructor() {
        this._username = ''
        this._connected = false;

        const socket = io("http://localhost:3000");

        this._setUsername();
        setInterval(() => this._sendMessage(), 5000);

        socket.on("login", (data) => {
            this._connected = true;
            const message = "Welcome to Chat – ";
            console.log(message);
            this._addParticipantsMessage(data);
        });

        socket.on("new message", (data) => {
            this._addChatMessage(data);
        });

        socket.on("user joined", (data) => {
            console.log(data.username + " joined");
            addParticipantsMessage(data);
        });

        socket.on("user left", (data) => {
            console.log(data.username + " left");
            addParticipantsMessage(data);
        });

        socket.on("disconnect", () => {
            console.log("you have been disconnected");
        });

        socket.on("reconnect", () => {
            console.log("you have been reconnected");
            if (username) {
                socket.emit("add user", username);
            }
        });

        socket.on("reconnect_error", () => {
            console.log("attempt to reconnect has failed");
        });
    }

    _makeid(length) {
        let result = ""
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        const charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    };

    _sendMessage() {
        const message = this._makeid(10);

        if (message && connected) {
            addChatMessage({
                username: username,
                message: message,
            });
            socket.emit("new message", message);
        }
    }

    _setUsername() {
        this._username = this._makeid(5);
        socket.emit("add user", this._username);
    };

    _addParticipantsMessage(data) {
        if (data.numUsers === 1) {
            console.log("there's 1 participant");
        } else {
            console.log("there are " + data.numUsers + " participants");
        }
    };

    _addChatMessage(data) {
        console.log(`${new Date().toDateString()}: ${data.username}: ${data.message}`);
    };

    login(userName) {
        socket.emit("add user", userName)
    }
}