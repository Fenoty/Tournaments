<template>
    <div class="bracket">
        <template v-for="game in games" :key="game">
            
            <h2>Раунд {{ game.round + 1 }}</h2>
            <template v-for="players in game.games">
                
                <div class="bracket-match">
                    <div class="bracket-match-team">
                        <div @click.prevent.stop="openEdit" class="score">
                            <span>{{ players.player1.score }}</span>
                            <div class="edit">
                                <input min="0" type="number" :value="players.player1.score">
                                <div class="edit-buttons">
                                    <button @click.prevent.stop="editTeamScore($event, players.player1.team_id)" class="success"></button>
                                    <button @click.prevent.stop="closeEdit" class="close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="name">
                            <h6>Команда:</h6>
                            <p>{{players.player1.name}}</p>
                        </div>
                    </div>
                    <span>VS</span>
                    <div class="bracket-match-team">
                        <template v-if="players.player2.id">
                            <div @click.prevent.stop="openEdit" class="score">
                                <span>{{ players.player2.score }}</span>
                                <div class="edit">
                                    <input min="0" type="number" :value="players.player2.score">
                                    <div class="edit-buttons">
                                        <button @click.prevent.stop="editTeamScore($event, players.player2.team_id)" class="success"></button>
                                        <button @click.prevent.stop="closeEdit" class="close"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="name">
                                <h6>Команда:</h6>
                                <p>{{players.player2.name}}</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="score"><span>{{ players.player2.score }}</span></div>
                            <div class="name">
                                <span>?</span>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { adminStore } from '@/stores/admin';

const adminStorage = adminStore()

const props = defineProps({
    games: {
        type: Array<any>,
        required: true,
    },
    // iteration: {
    //     type: Number,
    //     required: true,
    // },
})


const openEdit = (event: any) => {
    event.target.parentElement.classList.add('edit')
}
const closeEdit = (event: any) => {
    event.target.parentElement.parentElement.parentElement.classList.remove('edit')
}
const editTeamScore = (event: any, teamId: number) => {
    const container = event.target.parentElement.parentElement.parentElement
    const score = Number(container.closest('.edit').querySelector('input').value)
    
    adminStorage.editTeamScore(Number(teamId), score)

    container.classList.remove('edit')
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
    &-match{
        display: grid;
        grid-template-columns: 3fr 1fr 3fr;
        justify-content: space-between;
        gap: 16px;
        background: $color-3;

        color: $white;

        span{
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 40px;
        }
        &-team{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 32px;
            .score{
                background: $color-4;

                width: 100%;
                height: 100%;
                width: 100px;

                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
                &.edit{
                    span{
                        display: none;
                    }
                    .edit{
                        display: flex;
                    }
                }
                .edit{
                    display: none;
                    flex-direction: column;

                    width: 100%;
                    height: 100%;
                    input{
                        width: 100%;
                        flex-grow: 1;
                    }
                    &-buttons{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        button{
                            width: 100%;
                            padding: 10px;

                            display: flex;
                            align-items: center;
                            justify-content: center;

                            transition: all .3s ease;
                            &.success{
                                background: green;
                                &::before{
                                    content: '';
                                    display: block;

                                    clip-path: path('m9 19.414l-6.707-6.707l1.414-1.414L9 16.586L20.293 5.293l1.414 1.414z');
                                    background: $white;
                                    width: 20px;
                                    aspect-ratio: 1;
                                }
                            }
                            &.close{
                                background: red;
                                &::before{
                                    content: '';
                                    display: block;

                                    clip-path: path('M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z');
                                    background: $white;
                                    width: 20px;
                                    aspect-ratio: 1;
                                }
                            }
                            &:hover{
                                opacity: 0.6;
                            }
                        }
                    }
                }
            }
            .name{
                padding: 16px;
                h6, span{
                    font-size: 24px;
                    font-weight: 600;
                }
                p{
                    font-size: 20px;
                }
            }
            &:last-child{
                flex-direction: row-reverse;
            }
        }
    }
}
</style>
