import { DeepReadonly, readonly, Ref, ref, UnwrapRef } from '@vue/reactivity';
import { deepAssign } from './util';
import BroadcastEvent from './broadcast';

type AtomConfig<T> = {
    key: string;
    default: T;
    // is sync in all tabs
    sync?: boolean;
};

const globalAtomRecord: any = {};

/**
 * a lite tool Class for create an Atom state
 */
export class Atom<T> {
    private instanceRef: Ref<UnwrapRef<T>>;
    constructor(private config: AtomConfig<T>, private bc: BroadcastEvent<T>) {
        this.instanceRef = ref(this.config.default);
        if (this.config.sync) {
            this.bc.on(this.setValue);
        }
    }

    // read state
    state(): DeepReadonly<Ref<UnwrapRef<T>>> {
        return readonly(this.instanceRef);
    }

    setValue(value: UnwrapRef<T>) {
        this.instanceRef.value = value;
    }

    // write state with full mode
    useSetState() {
        return (value: UnwrapRef<T>) => {
            if (this.config.sync) {
                this.bc.emit(value);
            }
            this.setValue(value);
        };
    }

    // write state with merge mode
    useSetMergeState() {
        return (value: Partial<UnwrapRef<T>>) => {
            let finaValue = deepAssign(this.instanceRef.value, value);
            if (this.config.sync) {
                this.bc.emit(finaValue);
            }
            this.setValue(finaValue);
        };
    }
}

export function createState<T>(config: AtomConfig<T>): Atom<T> {
    // get the unique key in global
    let symbolId = Symbol.for(config.key);
    if (!globalAtomRecord[symbolId]) {
        // create a new atom state with inject broadcast-event
        const bc = new BroadcastEvent(config.key);
        globalAtomRecord[symbolId] = new Atom(config, bc);
    } else {
        console.warn(
            '[ATOM]: create atom with duplicate key, get the original object',
        );
    }

    return globalAtomRecord[symbolId];
}
