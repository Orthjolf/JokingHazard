module.exports = class Session {
    constructor() {
        this._id = this._generateId()
        this._players = []
    }

    _generateId() {
        return 123
    }

    _addPlayer(player) {
        this._players.push(player)
    }
}