<template>
    <div>{{ count }}</div>
    <add></add>
    <decide></decide>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { count } from "./state/count";
import add from "./components/add.vue";
import decide from "./components/decide.vue";

export default defineComponent({
    components: {
        add,
        decide,
    },
    setup() {
        return {
            count,
        };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
