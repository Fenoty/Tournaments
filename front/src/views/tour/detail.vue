<template>
    <div class="container">
        <div class="tournament">
            <div class="tournament-top">
                <div class="tournament-top-image">
                    <img :src="tourData.image" :alt="tourData.name">
                </div>
                <div class="tournament-top-info">
                    <h1>{{tourData.name}}</h1>
                    <p>{{ tourData.description }}</p>
                    
                </div>
                <div class="tournament-top-links">
                    <Qrcode
                        :value="tourData.url"
                        variant="rounded"
                    />
                    <ButtonDefault type="Link" :link="tourData.url" class="mx-auto max-w-[95%] p-[16px] text-[24px] font-bold">Записаться</ButtonDefault>
                </div>
            </div>
            <div class="tournament-teams">
                <h2>Команды:</h2>
                <ul>
                    <li v-for="item in teamsData" :key="item.id">
                        <h6>{{ item.team }}</h6>
                        <p>Очков: {{ item.points }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { tourStore } from '@stores/tours.ts'
const route = useRoute()
const tourStorage = tourStore();
console.log(route.params.id);

const tourData = await tourStorage.getCurrentTour(route.params.id)
const teamsData = await tourStorage.getAllTourTeams(route.params.id)



</script>

<style lang="scss" scoped>
.tournament{
    margin-top: 60px;

    display: flex;
    flex-direction: column;
    gap: 40px;
    &-top{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 50px;
        &-image{
            $size: 450px;
            max-height: $size;
            min-height: $size;
            max-width: $size;
            min-width: $size;
            overflow: hidden;
            img{
                max-height: inherit;
                min-height: inherit;
                max-width: inherit;
                min-width: inherit;
                object-fit: cover;
            }
        }
        &-info{
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
            h1{
                font-weight: 600;
                font-size: 32px;
            }
            p{
                font-weight: 500;
                font-size: 22px;
            }
        }
        &-links{
            display: flex;
            flex-direction: column;
            gap: 16px;
            svg{
                $size: 370px;
                max-width: $size;
                min-width: $size;
                max-height: $size;
                min-height: $size;
            }

        }
    }
    &-teams{
        display: flex;
        flex-direction: column;
        gap: 32px;
        h2{
            font-size: 50px;
            font-weight: 600;
        }
        ul{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 10px;
            li{
                background: $color-5;
                padding: 16px;
    
                display: flex;
                flex-direction: column;
                gap: 10px;
                h6{
                    font-size: 24px;
                    font-weight: 600;
                }
                p{
                    font-size: 16px;
                    font-weight: 500;
                }
            }
        }
    }
}
</style>
