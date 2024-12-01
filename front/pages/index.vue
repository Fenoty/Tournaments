<template>
    <div class="container">
        <div class="tournaments">
            <ControlSearch @searchCallback="searchTour"/>
            <div class="tournaments-list">
                <template v-for="index in 20" :key="index">
                    <CardTournament :index="index"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {tourStore} from '@stores/tours.ts'


const searchTour = (value: any) => {
    console.log('callback', value);
    
}

</script>

<style lang="scss" scoped>
.tournaments{
    margin-top: 60px;

    display: flex;
    flex-direction: column;
    gap: 40px;
    &-list{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 20px;
        
    }
}
</style>
