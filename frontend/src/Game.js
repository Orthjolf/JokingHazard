import DataTransport from './dataTransport'

export default class Game {
    constructor() {
        this._dataTransport = new DataTransport()

    }

    createSession() {

    }

    login(userName) {
        this._dataTransport.login(userName)
    }
}