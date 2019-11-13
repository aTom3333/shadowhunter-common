import {Card, CharacterState, Equipment} from "../Game/CharacterState";
import {PlayerInterface} from "./PlayerInterface";
import {ChoiceInterface} from "./ChoiceInterface";
import {FullRoom, RoomSummary} from "./RoomInterface";
import {AddDices, Dice4, Dice6, SubtractDices} from "../Event/DiceResult";


function getWrap<T>(eventName: string): {(param: T):T, stub:string} {
    const f = function(param: T) {
        return param;
    };
    (f as any).stub = eventName;
    return f as any;
}

export const Update = {
    OwnIdentity: getWrap<CharacterState>("update:ownidentity"),
    PlayerJoined: getWrap<PlayerInterface>("update:playerjoined"),
    PlayerLeft: getWrap<PlayerInterface>("update:playerleave"), // TODO Replace by 'playerleft' when other pieces of code will use this
    GameStarted: getWrap<FullRoom>("update:gamestarted"),
    Movement: getWrap<PlayerInterface>("update:movement"),
    TurnStart: getWrap<string>('update:turnstart'),
    DrawCard: getWrap<{player: PlayerInterface, card: Card}>('update:drawcard'),
    DiscardCard: getWrap<Card>('update:discardcard'),
    Equip: getWrap<{player: PlayerInterface, equipment: Equipment}>("update:equip"),
    Desequip: getWrap<{player: PlayerInterface, equipment: Equipment}>('update:desequip'),
    Attack: getWrap<{attacker: PlayerInterface, target: PlayerInterface, type: string}>('update:attack'),
    ChangeHP: getWrap<{player: PlayerInterface, type: string, amount: number}>('update:changehp'),
    Dead: getWrap<{target: PlayerInterface, killer: PlayerInterface}>('update:dead'),
    UsePower: getWrap<PlayerInterface>('update:usepower'),
    GameOver: getWrap<FullRoom>('update:gameover'),
    Reveal: getWrap<PlayerInterface>('update:revealplayer'),
    Message: getWrap<Array<any>>('update:message')
};

export const Request = {
    Choice: getWrap<ChoiceInterface>("request:choice")
};

export const Response = {
    RoomJoined: getWrap<{name: string; room: RoomSummary}>("response:roomjoined"),
    Choice: getWrap<any>("response:choice")
};

export const Dice = {
    D4: getWrap<Dice4>("dice:d4"),
    D6: getWrap<Dice6>("dice:d6"),
    Add: getWrap<AddDices>("dice:add"),
    Sub: getWrap<SubtractDices>("dice:sub"),
};

export const Debug = {
    CheckState: getWrap<FullRoom>('debug:checkstate')
};
