import {Board} from "./Board";
import {CharacterState} from "./CharacterState";


export enum Faction {
    Shadow, Hunter, Neutral
}

export interface VictoryCondition {
    description: string;
    isFulfilled(board: Board, self: CharacterState): boolean;
}

export interface Power {
    description: string;
    execute(board: Board, self: CharacterState): void;
}

/**
 * Represents a Character in the Shadow Hunter game,
 * that is information about a character that never changes
 */
export class Character {
    name: string;
    faction: Faction;
    hp: number;
    power: Power;
    victoryCondition: VictoryCondition;
    isExtension: boolean
}
