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
            console.log("-");
            setCount(count.value - 1);
        }
        return {
            decide,
        };
    },
});
</script>
