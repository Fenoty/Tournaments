<template>
    <div class="team" :class="{'winner': player.winner === 1, 'looser': player.winner === 2}">
        <div @click.stop="edit = true" class="score" :class="{'edit': edit}">
            <span>{{ player.score }}</span>
            <div class="edit">
                <input v-model="player.score" min="0" type="number">
                <div class="edit-buttons">
                    <button @click.stop="editTeamScore(player.team_id)" class="success"></button>
                    <button @click.stop="edit = false" class="close"></button>
                </div>
            </div>
        </div>
        <div class="winner">
            
        </div>
        <div class="name">
            <h6>Команда:</h6>
            <p>{{player.name}}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { adminStore } from '@/stores/admin';
import { ref } from 'vue';

const adminStorage = adminStore()

const props = defineProps({
    player: {
        type: Object,
        required: true
    }
})

const edit = ref(false)

const editTeamScore = async (teamId: number) => {
    await adminStorage.editTeamScore(Number(teamId), props.player.score)
    edit.value = false
}


</script>

<style lang="scss" scoped>
.team{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    &.winner{
        background: rgba(142, 249, 1, 0.7);
    }
    &.looser{
        background: rgba(255, 51, 51, 0.7);
    }
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

            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 40px;

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
                text-align: center;
                font-size: 24px;
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
        text-align: right;
    }
}
</style>