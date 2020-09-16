const express = require('express')
const http = require('http')
const socketio = require('socket.io')

module.exports = class DataTransport {
    constructor() {
        const server = http.createServer(express())
        this._io = socketio(server)
    }
}