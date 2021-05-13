import { createState } from '../../../src/index';

const countAtom = createState({
    default: 1,
    key: 'count',
});

export const count = countAtom.state();
export const setCount = countAtom.useSetState();
