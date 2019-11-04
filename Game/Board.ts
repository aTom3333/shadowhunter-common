import {Card, CharacterState, Location} from "./CharacterState";
import {clone} from "../Utility/CloneAs";


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

export interface Deck {
    discard: Array<Card>;
    numberLeft: number;
    serialize(): Deck;
}

function as(data: object, constructor: Function) {
    return Object.setPrototypeOf(data, constructor.prototype);
}

export class Board {
    states: Array<CharacterState>;
    currentCharacterId: number;
    locations: Array<Location>;
    whiteDeck: Deck;
    blackDeck: Deck;
    greenDeck: Deck;

    constructor(characters: Array<CharacterState>, locations: Array<Location>, whiteDeck: Deck, blackDeck: Deck, greenDeck: Deck) {
        this.states = characters;
        this.locations = locations;
        this.currentCharacterId = this.states[0].id;
        this.whiteDeck = whiteDeck;
        this.blackDeck = blackDeck;
        this.greenDeck = greenDeck;
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
        const currentIdx = this.states.findIndex(c => c.id === this.currentCharacterId);
        let nextIdx = currentIdx;
        do {
            nextIdx = this.nextOf(nextIdx);
        } while(this.states[nextIdx].dead);
        this.currentCharacterId = this.states[nextIdx].id;
    }

    serialize(isGameOver: boolean): Board {
        return as({
            states: this.states.map(c => {
                return as({
                    identity: isGameOver || c.revealed ? c.identity : null,
                    equipment: c.equipment.map(e => {
                        return {
                            name: e.name,
                            description: e.description,
                            color: e.color
                        };
                    }),
                    ...c
                }, CharacterState)
            }),
            currentCharacterId: this.currentCharacterId,
            locations: this.locations,
            whiteDeck: this.whiteDeck.serialize(),
            greenDeck: this.greenDeck.serialize(),
            blackDeck: this.blackDeck.serialize()
        }, Board);
        // let temp: Board = clone(this);
        // temp.greenDeck = this.greenDeck.serialize();
        // temp.blackDeck = this.blackDeck.serialize();
        // temp.whiteDeck = this.whiteDeck.serialize();
        // if(!isGameOver) {
        //     for(let i = 0; i < this.states.length; i++) {
        //         if(!this.states[i].revealed)
        //             temp.states[i].identity = null;
        //     }
        // }
        // return temp;
    }
}
