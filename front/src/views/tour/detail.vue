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
                    <div class="date">
                        <h6>Даты проведения:</h6>
                        <p>{{tourData.date}}</p>
                    </div>
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
                <div class="tournament-content">
                    <div class="tournament-content-tab">
                        <button @click="[tabs.teams = true, tabs.grid = false]" :class="{'active': tabs.teams}">Команды</button>
                        <button @click="[tabs.grid = true, tabs.teams = false]" :class="{'active': tabs.grid}">Турнирная сетка</button>
                    </div>
                    <div class="px-[16px] py-[32px]">
                        <template v-if="tabs.teams">
                            <div class="tournament-content-teams">
                                <ul>
                                    <li v-for="item in teamsData" :key="item.id">
                                        <h6>{{ item.team }}</h6>
                                        <p>Очков: {{ item.points }}</p>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template v-else-if="tabs.grid">
                            <div class="tournament-content-grid">
                                <!-- <Grid :grid="teamsData" :logged="isLoggedIn"/> -->
                                <TourRowBracket
                                    :games="teamsGridData"
                                />

                            </div>
                        </template>
                    </div>
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

import { computed, onMounted, ref, watch } from 'vue';

import Grid from "@/components/layout/Grid.vue";
import TourRowBracket from "@/components/bracket/TourRowBracket.vue";
import _ from "lodash";
import { adminStore } from "@/stores/admin";

const route = useRoute()


const adminStorage = adminStore()
const tourStorage = tourStore();

const isLoggedIn = computed(() => adminStorage.isLoggedIn)

const tourData = ref({}) as any;
const teamsData = computed(() => tourStorage.getOnlyTeams);
const teamsGridData = computed(() => tourStorage.getGeneratedBracket);

const tabs = ref({
    teams: false as boolean,
    grid: true as boolean
})



const initData = async (route: any) => {
    if (route.params.id) {
        tourData.value = await tourStorage.getCurrentTour(Number(route.params.id))
        await tourStorage.getAllTourTeams(Number(route.params.id))
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
            .date{
                margin-top: 16px;

                display: flex;
                flex-direction: column;
                gap: 16px;
                h6{
                    font-size: 24px;
                    font-weight: 600;
                }
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
    
    &-content{
        background: $color-5;
        &-tab{
            font-size: 32px;
            font-weight: 600;
    
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 16px;

            background: $white;
            button{
                padding: 16px;
                &.active{
                    background: $color-5;
                }
            }
        }
        &-teams{
            display: flex;
            flex-direction: column;
            gap: 32px;
            
            ul{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 10px;
                li{
                    background: $color-4;
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
}
</style>
