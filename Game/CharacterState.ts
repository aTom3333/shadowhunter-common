import {Character} from "./Character";
import {Board} from "./Board";



export interface Location {
    description: string;
    numbers: Array<number>;
}

export enum CardColor {
    White, Black, Green
}

export interface Card {
    name: string;
    description: string;
    color: CardColor;
}

export interface Equipment extends Card {
}


/**
 * Represents the state of a character during a game as it changes
 */
export class CharacterState {
    id: number;
    identity: Character;
    lostHp: number;
    equipment: Array<any>;
    dead: boolean;
    revealed: boolean;
    powerUsed: boolean;
    location: Location;

    constructor(id: number, identity: Character) {
        this.id = id;
        this.identity = identity;
        this.lostHp = 0;
        this.equipment = [];
        this.dead = false;
        this.revealed = false;
        this.powerUsed = false;
    }

    dealDamage(damage: number): number {
        // TODO test equipment
        this.lostHp += damage;
        return damage;
    }
}
