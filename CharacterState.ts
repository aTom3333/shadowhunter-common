import {Character} from "./Character";

export class CharacterState {
    identity: Character;
    lostHp: number;
    equipment: any;
    dead: boolean;
    revealed: boolean;
    powerUsed: boolean;
}
