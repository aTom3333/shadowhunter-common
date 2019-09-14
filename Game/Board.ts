import {CharacterState} from "./CharacterState";


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

    constructor(characters: Array<CharacterState>) {
        this.states = characters;
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
}
