export class Player {

    #name;
    #total_played_time;

    constructor(name) {
        this.#name = name;
        this.#total_played_time = 0;
    }

    add_played_time(played_time) {
        this.#total_played_time = this.#total_played_time + played_time;
    }
    
}