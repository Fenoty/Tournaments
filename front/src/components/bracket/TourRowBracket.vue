<template>
    <div class="bracket">
        <template v-for="game in games" :key="game">
            
            <h2>Раунд {{ game.round + 1 }}</h2>
            <template v-for="players in game.games">
                
                <div class="bracket-match">
                    <div class="bracket-match-row">
                        <BracketMatch :player="players.player1"/>
                        <span>VS</span>
                        <BracketMatch :player="players.player2"/>
                    </div>
                    <div class="bracket-match-controls">
                        <template v-if="players.player1.id && players.player1.winner === 0 && players.player2.winner === 0 ">
                            <button @click="$emit('setWinners',{winner: players.player1, looser: players.player2, iteration: game.round})">Объявить победителем</button>
                        </template>
                        <template v-if="players.player2.id && players.player2.winner === 0 && players.player1.winner === 0">
                            <button @click="$emit('setWinners',{winner: players.player2, looser: players.player1, iteration: game.round})">Объявить победителем</button>
                        </template>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import BracketMatch from '@components/bracket/BracketMatch.vue';
import { computed } from 'vue';

defineProps({
    games: {
        type: Array<any>,
        required: true,
    },
})
const emit = defineEmits()
</script>

<style scoped lang="scss">
.bracket{
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    h2{
        background: $color-1;
        padding: 16px;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        color: $white;
    }
    &-match{
        display: flex;
        flex-direction: column;
        &-row{
            display: grid;
            grid-template-columns: 3fr 0px 3fr;
            justify-content: space-between;
            gap: 0;
            background: $color-3;
    
            color: $white;
            span{   
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 40px;
                z-index: 5;
            }
        }
        &-controls{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0;
            button{
                padding: 16px;
                font-size: 24px;
                font-weight: 600;
                width: 100%;
                color: $white;
                background: green;
                &:hover{
                    opacity: 0.7;
                }
            }
        }
    }
}
</style>
