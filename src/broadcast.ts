import { UnwrapRef } from '@vue/reactivity';
import { uuid } from './util';

export default class BroadcastEvent<T> {
    private bc: BroadcastChannel;
    private idFlag: string;
    private onEvents: ((value: UnwrapRef<T>) => void)[] = [];
    constructor(id: string) {
        this.bc = new BroadcastChannel(id);
        this.idFlag = uuid();
        this.bc.onmessage = e => {
            this.onEvents.forEach(event => {
                event.call(this, e.data.value);
            });
        };
    }

    emit(value: UnwrapRef<T>) {
        this.bc.postMessage({
            value,
            id: this.idFlag,
        });
    }

    on(fn: (value: UnwrapRef<T>) => void) {
        this.onEvents.push(fn);
    }

    off(fn: (value: UnwrapRef<T>) => void) {
        let index = this.onEvents.indexOf(fn);
        if (index !== -1) {
            this.onEvents.splice(this.onEvents.indexOf(fn), 1);
        }
    }
}
