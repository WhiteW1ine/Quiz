class Player {

    #name = "";
    #total_played_time = 0;



    constructor(name) {
        this.name = name;
    }

    add_played_time(played_time) {
        this.#total_played_time = this.#total_played_time + played_time;
    }
    
}