<template>
    <div>
        <bracket :rounds="rounds">
            <template v-slot:player="{ player }">
                {{ player.name }}
            </template>
        </bracket>
    </div>
</template>

<script lang="ts" setup>
import Bracket from "vue-tournament-bracket";
const rounds = ref([
    //Semi finals
    {
        games: [
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "4", name: "Competitor 4", winner: true },
            },
            {
                player1: { id: "5", name: "Competitor 5", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "4", name: "Competitor 4", winner: true },
            },
            {
                player1: { id: "5", name: "Competitor 5", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "4", name: "Competitor 4", winner: true },
            },
            {
                player1: { id: "5", name: "Competitor 5", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "4", name: "Competitor 4", winner: true },
            },
            {
                player1: { id: "5", name: "Competitor 5", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
        ],
    },
    //Third place play off
    {
        games: [
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "5", name: "Competitor 5", winner: true },
            },
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "5", name: "Competitor 5", winner: true },
            },
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "5", name: "Competitor 5", winner: true },
            },
            {
                player1: { id: "1", name: "Competitor 1", winner: false },
                player2: { id: "5", name: "Competitor 5", winner: true },
            },
        ],
    },
    //Final
    {
        games: [
            {
                player1: { id: "4", name: "Competitor 4", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
            {
                player1: { id: "4", name: "Competitor 4", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
        ],
    },
    {
        games: [
            {
                player1: { id: "4", name: "Competitor 4", winner: false },
                player2: { id: "8", name: "Competitor 8", winner: true },
            },
        ],
    },
]);

console.log(rounds.value);
</script>

<style lang="scss">

</style>
