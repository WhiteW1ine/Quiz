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
    
}