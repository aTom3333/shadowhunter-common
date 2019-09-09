import {Character} from "./Character";

export class CharacterState {
    id: number;
    identity: Character;
    lostHp: number;
    equipment: Array<any>;
    dead: boolean;
    revealed: boolean;
    powerUsed: boolean;

    constructor(id: number, identity: Character) {
        this.id = id;
        this.identity = identity;
        this.lostHp = 0;
        this.equipment = [];
        this.dead = false;
        this.revealed = false;
        this.powerUsed = false;
    }
}
