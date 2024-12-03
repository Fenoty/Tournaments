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
                    
                    <QRCodeVue3 
                        v-if="tourData.url"
                        :width="350"
                        :height="350"
                        myclass="qr"
                        :value="tourData.url"
                        :qrOptions="{ typeNumber: 0, mode: 'Byte',}"
                        :dotsOptions="{
                            type: 'square',
                            color: 'black',
                        }"
                        :backgroundOptions="{ color: '#ffffff' }"
                        :cornersSquareOptions="{ type: 'square', color: '#000000' }"
                        :cornersDotOptions="{ type: 'square', color: '#000000' }"
                    />
                    <Button type="Link" :link="tourData.url" class="p-[16px] text-[24px] font-bold">Записаться</Button>
                </div>
            </div>
            <template v-if="teamsData.length > 0">
                <div class="tournament-teams">
                    <h2>Команды:</h2>
                    <ul>
                        <li v-for="item in teamsData" :key="item.id">
                            <h6>{{ item.team }}</h6>
                            <p>Очков: {{ item.points }}</p>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3";
import Button from '@components/button/Default.vue'
import { useRoute } from 'vue-router';
import { tourStore } from '@stores/tours'

import { onMounted, ref, watch } from 'vue';

const route = useRoute()

const tourStorage = tourStore();

const tourData = ref({}) as any;
const teamsData = ref({}) as any;

const initData = async (route: any) => {
    if (route.params.id) {
        tourData.value = await tourStorage.getCurrentTour(Number(route.params.id))
        teamsData.value = await tourStorage.getAllTourTeams(Number(route.params.id))
    }
}



onMounted(async () => {
    await initData(route);
    
    watch(route, async (newValue, oldValue) => {
        await initData(newValue);
    })
})




</script>

<style lang="scss">
.tournament{
    padding: 60px 0;

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
            .qr{
                $size: 350px;
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
