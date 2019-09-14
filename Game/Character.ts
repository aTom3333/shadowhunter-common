export enum Faction {
    Shadow, Hunter, Neutral
}

export interface VictoryCondition {
    description: string;
}

export interface Power {
    description: string;
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

    constructor(name: string, faction: Faction, hp: number, power: Power, victoryCondition: VictoryCondition, isExtension: boolean = false) {
        this.name = name;
        this.faction = faction;
        this.hp = hp;
        this.power = power;
        this.victoryCondition = victoryCondition;
        this.isExtension = isExtension;
    }
}
