import io from "socket.io-client";

export default class DataTransport {
    constructor() {
        var username;
        var connected = false;

        var socket = io("http://localhost:3000");

        const addParticipantsMessage = (data) => {
            if (data.numUsers === 1) {
                console.log("there's 1 participant");
            } else {
                console.log("there are " + data.numUsers + " participants");
            }
        };

        // Sets the client's username
        const setUsername = () => {
            username = makeid(5);
            // Tell the server your username
            socket.emit("add user", username);
        };

        // Sends a chat message
        const sendMessage = () => {
            const message = makeid(10);

            if (message && connected) {
                addChatMessage({
                    username: username,
                    message: message,
                });
                // tell server to execute 'new message' and send along one parameter
                socket.emit("new message", message);
            }
        };

        const addChatMessage = (data) => {
            console.log(
                `${new Date().toDateString()}: ${data.username}: ${data.message}`
            );
        };

        const makeid = (length) => {
            var result = "";
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        };

        setUsername();
        setInterval(() => sendMessage(), 5000);

        // Whenever the server emits 'login', log the login message
        socket.on("login", (data) => {
            connected = true;
            // Display the welcome message
            var message = "Welcome to Chat – ";
            console.log(message);
            addParticipantsMessage(data);
        });

        // Whenever the server emits 'new message', update the chat body
        socket.on("new message", (data) => {
            addChatMessage(data);
        });

        // Whenever the server emits 'user joined', log it in the chat body
        socket.on("user joined", (data) => {
            console.log(data.username + " joined");
            addParticipantsMessage(data);
        });

        // Whenever the server emits 'user left', log it in the chat body
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
}