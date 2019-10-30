import {PlayerInterface} from "../Protocol/PlayerInterface";

export interface DiceResult {
    finalValue(): number;
    player: PlayerInterface;
}

export interface Dice4 extends DiceResult {
    value: number;
}

export interface Dice6 extends DiceResult {
    value: number;
}

export interface AddDices extends DiceResult {
    d4: Dice4;
    d6: Dice6;
}

export interface SubtractDices extends DiceResult {
    d4: Dice4;
    d6: Dice6;
}
