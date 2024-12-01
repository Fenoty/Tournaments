<template>
    <div class="container">
        <div class="tournaments">
            <Search @searchCallback="searchTour"/>
            <div class="tournaments-list">
                <template v-for="item in filteredTour" :key="item.id">
                    <CardTournament :data="item"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Search from '@components/control/Search.vue'
import CardTournament from '@components/card/Tournament.vue'

import { tourStore } from '@stores/tours.ts'
import _ from 'lodash'

import {onMounted} from 'vue'


const tourStorage = tourStore()

onMounted(async () => {
    await tourStorage.getAllTour()
    // Создание реактивной переменной для фильтрации
    const filteredTour = ref(tourStorage.tournaments);

    // Получение первоначального массива турниров
    const tournaments = computed(() => tourStorage.tournaments);

    const searchTour = (value: string) => {
        // Фильтрация турниров и обновление переменной filteredTour
        filteredTour.value = _.filter(tournaments.value, item => 
            _.includes(item.name.toLowerCase(), value.toLowerCase())
        );
    }
}),





</script>

<style lang="scss" scoped>
.tournaments{
    margin-top: 60px;

    display: flex;
    flex-direction: column;
    gap: 40px;
    &-list{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 400px));
        gap: 20px;
        
    }
}
</style>
