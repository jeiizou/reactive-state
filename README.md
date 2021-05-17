# reactive-state

> a atom state manager lib base on vue-reactivity

## Usage

basic: 

```ts
import { createState } from 'reactive-state';

const countState = createState({
    default: 1,
    key: 'count',
});

// read
export const count = countState.state();
// write
export const setCount = countState.useSetState();
```

in component:

```vue
<template>
    <button @click="decide">-</button>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { count, setCount } from "../state/count";

export default defineComponent({
    name: "home",
    setup() {
        function decide() {
            setCount(count.value - 1);
        }
        return {
            decide,
        };
    },
});
</script>
```

> tips: should get the value by read the `value` property, ex: `state.value`. and the state is readonly.

## Dervice


## Task


## SyncAtom