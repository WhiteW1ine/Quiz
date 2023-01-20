export class Player {

    #name;
    #totalPlayedTime;

    constructor(name) {
        this.#name = name;
        this.#totalPlayedTime = 0;
    }

    addPlayedTime(playedTime) {
        this.#totalPlayedTime = this.#totalPlayedTime + playedTime;
    }

    getPlayedTime() {
        return this.#totalPlayedTime;
    }

    getPlayerName() {
        return this.#name;
    }
    
}