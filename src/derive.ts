import { computed, ComputedGetter, ComputedRef } from '@vue/reactivity';

type DeriveConfig<T> = {
    get: ComputedGetter<T>;
};

// computed atom: derive
// limit computed can only read the reactive state
export class Derive<T> {
    private computedValue: ComputedRef<T>;
    constructor(deriveFunction: ComputedGetter<T>) {
        this.computedValue = computed(deriveFunction);
    }

    // get derive value
    get() {
        return this.computedValue;
    }
}

export function createDerive<T>(config: DeriveConfig<T>) {
    return new Derive<T>(config.get);
}
