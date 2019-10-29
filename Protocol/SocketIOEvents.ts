import {CharacterState} from "../Game/CharacterState";
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
    GameStarted: getWrap<FullRoom>("update:gamestarted")
};

export const Request = {
    Choice: getWrap<ChoiceInterface>("request:choice")
};

export const Response = {
    RoomJoined: getWrap<RoomSummary>("response:roomjoined"),
    Choice: getWrap<any>("response:choice")
};

export const Dice = {
    D4: getWrap<Dice4>("dice:d4"),
    D6: getWrap<Dice6>("dice:d6"),
    Add: getWrap<AddDices>("dice:add"),
    Sub: getWrap<SubtractDices>("dice:sub"),
};
