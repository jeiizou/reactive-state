<template>
    <button @click="add">+</button>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { setCount, count } from "../state/count";

export default defineComponent({
    name: "home",
    setup() {
        function add() {
            console.log("+");
            setCount(count.value + 1);
        }
        return {
            add,
        };
    },
});
</script>