import {Character, Faction} from "./Character";


export interface Composition {
    noShadow: number;
    noHunter: number;
    noNeutral: number;
    pool: Array<Character>
}

function compoFromPoolAndNo(pool: Array<Character>, noplayer: number): Composition {
    let amountShadowHunter = 0;
    let amountNeutral = 0;
    switch (this.players.length) {
        case 2:
            amountNeutral = 0;
            amountShadowHunter = 1;
            break;
        case 3:
            amountNeutral = 1;
            amountShadowHunter = 1;
            break;
        case 4:
            amountNeutral = 0;
            amountShadowHunter = 2;
            break;
        case 5:
            amountNeutral = 1;
            amountShadowHunter = 2;
            break;
        case 6:
            amountNeutral = 2;
            amountShadowHunter = 2;
            break;
        case 7:
            amountNeutral = 3;
            amountShadowHunter = 2;
            break;
        case 8:
            amountNeutral = 2;
            amountShadowHunter = 3;
            break;
        default:
            throw new Error('Not implemented');
    }

    return {
        noHunter: amountShadowHunter,
        noShadow: amountShadowHunter,
        noNeutral: amountNeutral,
        pool
    };
}

export function standardCompositionBuilder(everyCharacter: Array<Character>) {
    return function(noplayer: number): Composition {
        const pool = everyCharacter.filter(c => !c.isExtension);
        return compoFromPoolAndNo(pool, noplayer);
    }
}

export function extendedCompositionBuilder(everyCharacter: Array<Character>) {
    return function(noplayer: number): Composition {
        const pool = everyCharacter.filter(c => c.name !== 'Bob' || c.isExtension); // Remove the non extension Bob
        return compoFromPoolAndNo(pool, noplayer);
    }
}
