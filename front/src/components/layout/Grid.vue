<template>
    <div>
        <!-- <bracket :rounds="grid" >
            <template v-slot:player="{ player }">
                {{ player.name }}
            </template>
            <template v-if="logged" #player-extension-bottom="{ match }">
                <button>
                    Редактировать
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.561 5.318l-2.879-2.879A1.5 1.5 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06M11.5 14.672L9.328 12.5l6.293-6.293l2.172 2.172zm-2.561-1.339l1.756 1.728L9 15zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289c-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29c.464-.19.896-.347 1.188-.64L16 13zm2.5-11.328L16.328 5.5l1.293-1.293l2.171 2.172z"/></svg>
                </button>
            </template>
        </bracket> -->


        

    </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import Bracket from "@components/bracket/Bracket.vue";
import TourTest from "../bracket/TourTest.vue";
import { ref } from "vue";

const props = defineProps({
    grid: {
        type: Array<Object>,
        required: true,
    },
    logged: {
        type: Boolean,
        required: true,
    },
})


const teams = [
    { id: 1, name: 'Команда A', iteration: 0 },
    { id: 2, name: 'Команда B', iteration: 0 },
    { id: 3, name: 'Команда C', iteration: 1 },
    { id: 4, name: 'Команда D', iteration: 1 },
// Добавьте другие команды
]

console.log(props.grid);


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
    // //Third place play off
    // {
    //     games: [
    //         {
    //             player1: { id: "1", name: "Competitor 1", winner: false },
    //             player2: { id: "5", name: "Competitor 5", winner: true },
    //         },
    //         {
    //             player1: { id: "1", name: "Competitor 1", winner: false },
    //             player2: { id: "5", name: "Competitor 5", winner: true },
    //         },
    //         {
    //             player1: { id: "1", name: "Competitor 1", winner: false },
    //             player2: { id: "5", name: "Competitor 5", winner: true },
    //         },
    //         {
    //             player1: { id: "1", name: "Competitor 1", winner: false },
    //             player2: { id: "5", name: "Competitor 5", winner: true },
    //         },
    //     ],
    // },
    // //Final
    // {
    //     games: [
    //         {
    //             player1: { id: "4", name: "Competitor 4", winner: false },
    //             player2: { id: "8", name: "Competitor 8", winner: true },
    //         },
    //         {
    //             player1: { id: "4", name: "Competitor 4", winner: false },
    //             player2: { id: "8", name: "Competitor 8", winner: true },
    //         },
    //     ],
    // },
    // {
    //     games: [
    //         {
    //             player1: { id: "4", name: "Competitor 4", winner: false },
    //             player2: { id: "8", name: "Competitor 8", winner: true },
    //         },
    //     ],
    // },
]);

// console.log(rounds.value);
</script>

<style lang="scss">
.vtb{
    &-item{
        &-players{
            width: 100%;
            max-width: 300px;
            min-width: 300px;
            background-color: transparent;
            button{
                margin-top: 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;

                width: 100%;
                font-size: 24px;
                background: $color-1;
                &:hover{
                    background: $color-2;
                }
            }
        }
    }
    &-player{
        font-size: 24px;
    }
}
</style>
