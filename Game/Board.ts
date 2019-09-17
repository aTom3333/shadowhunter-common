import {CharacterState, Location} from "./CharacterState";


export enum TurnStep {
    Start, BeforeMove, AfterMove, BeforePlaceAction, AfterPlaceAction,
    BeforeAttack, AfterAttack, End, Other
}

export class TurnDescriptor {
    step: TurnStep;
    character: CharacterState;

    constructor(character: CharacterState, step: TurnStep) {
        this.character = character;
        this.step = step;
    }
}

export class Board {
    states: Array<CharacterState>;
    currentTurn: TurnDescriptor;
    locations: Array<Location>;

    constructor(characters: Array<CharacterState>, locations: Array<Location>) {
        this.states = characters;
        this.locations = locations;
        this.currentTurn = new TurnDescriptor(this.states[0], TurnStep.Start);
    }

    nextOf(index: number) {
        index += 1;
        if(index >= this.states.length)
            index = 0;
        return index;
    }

    previousOf(index: number) {
        index -= 1;
        if(index < 0)
            index = this.states.length-1;
        return index;
    }

    nextTurn() {
        const currentIdx = this.states.findIndex(c => c.id === this.currentTurn.character.identity);
        let nextIdx = currentIdx;
        do {
            nextIdx = this.nextOf(nextIdx);
        } while(this.states[nextIdx].dead);
        this.currentTurn.character = this.states[nextIdx];
    }
}
