import {CharacterState} from "./CharacterState";


export class Board {
    states: Array<CharacterState>;

    nextOf(index) {
        index += 1;
        if(index >= this.states.length)
            index = 0;
        return index;
    }

    previousOf(index) {
        index -= 1;
        if(index < 0)
            index = this.states.length-1;
        return index;
    }
}
