import {Board} from "./Board";


export enum Faction {
    Shadow, Hunter, Neutral
}

export interface VictoryCondition {
    description: string;
    isFulfilled(board: Board): boolean;
}

/**
 * Represents a Character in the Shadow Hunter game,
 * that is information about a character that never changes
 */
export class Character {
    name: string;
    faction: Faction;
    hp: number;
    //todo power
    victoryCondition: VictoryCondition;
    //todo location
    isExtension: boolean
}
