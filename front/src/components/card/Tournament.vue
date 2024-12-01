<template>
    <article class="card">
        <div class="card-image">
            <img :src="data.image" :alt="data.name">
        </div>
        
        <div class="card-bottom">
            <h6>{{ data.name }}</h6>
            <div class="card-bottom-date">
                <h6>Даты проведения:</h6>
                <p>{{ data.date }}</p>
                
            </div>
            <div class="card-bottom-button">
                <Button type="Link" :link="`/tour/${data.id}`" class="p-[10px] text-[24px] font-bold">Открыть</Button>
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
import Button from '@components/button/Default.vue'

defineProps({
    data: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
    .card{
        width: 100%;
        display: flex;
        flex-direction: column;
        &-image{
            width: 100%;
            max-width: 100%;
            min-height: 280px;
            max-height: 280px;
            overflow: hidden;
            img{
                width: inherit;
                min-height: inherit;
                max-height: inherit;
                object-fit: cover;  
            }
        }
        &-bottom{
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            flex-grow: 1;

            border: 1px solid $color-1;
            h6{
                font-size: 20px;
                font-weight: 600;
            }
            &-date{
                display: flex;
                flex-direction: column;
                gap: 10px;
                flex-grow: 1;
                h6{
                    font-weight: 600;
                    font-size: 24px;
                }
                p{
                    font-size: 18px;
                    font-weight: 500;
                }
            }
        }
    }
</style>
