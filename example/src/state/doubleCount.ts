import { createDerive } from '../../../src/index';
import { count } from './count';

const doubleCountDerive = createDerive({
    get: () => {
        return count.value * 2;
    },
});

export const doubleCount = doubleCountDerive.get();
