import {Board} from "./Board";


export enum Faction {
    Shadow, Hunter, Neutral
}

export interface VictoryCondition {
    description: string;
    isFullfilled(board: Board): boolean;
}

export class Character {
    name: string;
    faction: Faction;
    hp: number;
    //todo power
    victoryCondition: VictoryCondition;
    //todo location
    isExtension: boolean
}
