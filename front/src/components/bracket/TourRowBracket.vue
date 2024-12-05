<template>
    <div class="bracket">
        <template v-for="game in games" :key="game">
            
            <template v-if="normal">
                <h2>Раунд {{ game.round + 1 }}</h2>
            </template>
            <template v-else>
                <h2>Раунд нижней сетки {{ game.round + 1 }} </h2>
            </template>
            
            <template v-for="players in game.games">
                
                <div class="bracket-match">
                    <template v-if="winTourId === players.player1.id">
                        <div class="bracket-result">
                            Победитель: {{ players.player1.name }}
                        </div>
                    </template>
                    <template v-else>
                        <div class="bracket-match-row">
                            <BracketMatch :logged="logged" :player="players.player1"/>
                            <span>VS</span>
                            <BracketMatch :logged="logged" :player="players.player2"/>
                        </div>
                        <div v-if="logged" class="bracket-match-controls">
                            <template v-if="players.player1.id && players.player1.winner === 0 && players.player2.winner === 0 ">
                                <button @click="setWinners(players.player1, players.player2, game.round)">Объявить победителем</button>
                            </template>
                            <template v-if="players.player2.id && players.player2.winner === 0 && players.player1.winner === 0">
                                <button @click="setWinners(players.player2, players.player1, game.round)">Объявить победителем</button>
                            </template>
                        </div>
                    </template>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { tourStore } from '@/stores/tours';
import BracketMatch from '@components/bracket/BracketMatch.vue';
import { computed } from 'vue';


const tourStorage = tourStore()

const props = defineProps({
    games: {
        type: Array<any>,
        required: true,
    },
    logged: {
        type: Boolean,
        required: true,
    },
    normal: {
        type: Boolean,
        required: true,
        default: true
    },
    gridType: {
        type: String,
        required: false,
        default: null
    },
})
const emit = defineEmits()
const winTourId = computed(() => {
    const data = tourStorage.getWinnerId
    console.log("COMPUTED", data);
    if (!data) {
        return data
    }


    if (data.lower) {
        if (data.lower === 2) {
            console.log('normal');
            
            return 'normal'
        }
        else{
            return null
        }
    }
    
    return data.normal
})

const setWinners = (winner: any, looser: any, iteration: number) => {
    const data = {
        winner,
        looser,
        iteration,
        type: winTourId.value == 'normal' ? true : props.normal,
        gridType: props.gridType
    }
    console.log(winTourId.value == 'normal' ? true : props.normal);
    
    emit('setWinners', data)
}

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
    &-result{
        text-align: center;
        font-size: 32px;
        font-weight: 600;

        background: green;
        color: $white;
        padding: 32px;

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
