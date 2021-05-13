import { readonly, Ref, ref, UnwrapRef } from '@vue/reactivity';
import { deepAssign } from './util';
import BroadcastEvent from './broadcast';

type AtomConfig<T> = {
    key: string;
    default: T;
};

const globalAtomRecord: any = {};

/**
 * a lite tool Class for create an Atom state
 */
class Atom<T> {
    private instanceRef: Ref<UnwrapRef<T>>;
    constructor(private config: AtomConfig<T>, private bc: BroadcastEvent<T>) {
        this.instanceRef = ref(this.config.default);
        this.bc.on((value: UnwrapRef<T>) => {
            this.instanceRef.value = value;
        });
    }

    // read state
    state() {
        return readonly(this.instanceRef);
    }

    setValue(value: UnwrapRef<T>) {
        this.bc.emit(value);
        this.instanceRef.value = value;
    }

    // write state with full mode
    useSetState() {
        return (value: UnwrapRef<T>) => {
            this.setValue(value);
        };
    }

    // write state with merge mode
    useSetMergeState() {
        return (value: Partial<UnwrapRef<T>>) => {
            this.setValue(deepAssign(this.instanceRef.value, value));
        };
    }
}

export function createState<T>(config: AtomConfig<T>): Atom<T> {
    let symbolId = Symbol.for(config.key);
    if (!globalAtomRecord[symbolId]) {
        const bc = new BroadcastEvent(config.key);
        globalAtomRecord[symbolId] = new Atom(config, bc);
    } else {
        console.warn(
            '[ATOM]: create atom with duplicate key, get the original object',
        );
    }

    return globalAtomRecord[symbolId];
}
