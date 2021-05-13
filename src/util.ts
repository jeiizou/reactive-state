export function isObject(obj: any) {
    return obj !== null && typeof obj === 'object';
}

export function deepAssign(origin: any, target: any) {
    for (const key of Object.keys(target)) {
        if (isObject(target[key])) {
            origin[key] = deepAssign(origin[key], target[key]);
        } else {
            origin[key] = target[key];
        }
    }
    return origin;
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
