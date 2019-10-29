import {Board} from "../Game/Board";


export enum RoomState {
    Setup, Playing, Over
}

export interface RoomSummary {
    name: string;
    state: RoomState;
    noplayers: number
}

export interface FullRoom {
    board: Board,
    players: Array<{id: number; name: string;}>;
}
