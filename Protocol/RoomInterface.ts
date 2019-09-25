

export enum RoomState {
    Setup, Playing, Over
}

export interface RoomSummary {
    name: string;
    state: RoomState;
    noplayers: number
}
