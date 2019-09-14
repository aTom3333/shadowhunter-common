import {CharacterState} from "./CharacterState";


export enum TurnStep {
    Start, BeforeMove, AfterMove, BeforePlaceAction, AfterPlaceAction,
    BeforeAttack, AfterAttack, End, Other
}

export class TurnDescriptor {
    step: TurnStep;
    character: CharacterState;
}

export class Board {
    states: Array<CharacterState>;
    currentTurn: TurnDescriptor;

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
