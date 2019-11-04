

export function getDifference(first: any, second: any): Array<string>|null {
    if(typeof first !== typeof second)
        return [];
    switch (typeof first) {
        case 'object':
            if(first instanceof Array) {
                if(second instanceof Array) {
                    if(first.length !== second.length)
                        return [];
                    for(let i = 0; i < first.length; i++) {
                        const res = getDifference(first[i], second[i]);
                        if(res !== null)
                            return [`[${i}]`].concat(res);
                    }
                    return null;
                }
            }
            for(const key in first) {
                if(first.hasOwnProperty(key)) {
                    if(key in second) {
                        const res = getDifference(first[key], second[key]);
                        if(res !== null)
                            return [`.${key}`].concat(res);
                    } else {
                        return [`.${key}`];
                    }
                }
            }
            for(const key in second) {
                if(second.hasOwnProperty(key))
                    if(!(key in first))
                        return [`.${key}`];
            }
            return null;

        default:
            return first === second ? null : [];
    }
}

export function compare(obj1: any, obj2: any) {
    return getDifference(obj1, obj2) === null;
}
