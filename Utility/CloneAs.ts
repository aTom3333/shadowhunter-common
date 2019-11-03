

export function cloneAs<T, U>(from: U, prototype: Function): T {
    let cloned: any = {};
    for(const key in from) {
        if(from.hasOwnProperty(key))
            cloned[key] = clone(from[key]);
    }
    return Object.setPrototypeOf(cloned, prototype);
}

function cloneArray<T>(arr: Array<T>): Array<T> {
    return arr.map(e => clone(e));
}

export function clone<T>(from: T): T {
    if(typeof from !== 'object' || from === null) {
        return from;
    } else if(from instanceof Array) {
        // @ts-ignore
        return cloneArray(from);
    }
    return cloneAs(from, Object.getPrototypeOf(from));
}
