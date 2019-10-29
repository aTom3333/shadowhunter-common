import {Character} from "./Character";
import {Board} from "./Board";



export interface Location {
    name: string;
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

export enum PawnColor {
    Black, Blue, Purple, Red, Green, White, Yellow, Orange
}


/**
 * Represents the state of a character during a game as it changes
 */
export class CharacterState {
    id: number;
    identity: Character;
    lostHp: number;
    equipment: Array<Equipment>;
    dead: boolean;
    revealed: boolean;
    powerUsed: boolean;
    location: Location;
    pawnColor: PawnColor;

    constructor(id: number, identity: Character, color: PawnColor) {
        this.id = id;
        this.identity = identity;
        this.lostHp = 0;
        this.equipment = [];
        this.dead = false;
        this.revealed = false;
        this.powerUsed = false;
        this.pawnColor = color;
    }

    dealDamage(damage: number): number {
        this.lostHp += damage;
        return damage;
    }
}
