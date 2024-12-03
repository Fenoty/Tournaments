<template>
    <article class="card">
        <div class="card-image">
            <img :src="data.image" :alt="data.name">
            
            <div v-if="logged" class="controls">
                <Button @click="$emit('edit', data.id)" class="p-[5px]">
                    <svg class="size-[40px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.561 5.318l-2.879-2.879A1.5 1.5 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06M11.5 14.672L9.328 12.5l6.293-6.293l2.172 2.172zm-2.561-1.339l1.756 1.728L9 15zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289c-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29c.464-.19.896-.347 1.188-.64L16 13zm2.5-11.328L16.328 5.5l1.293-1.293l2.171 2.172z"/></svg>
                </Button>
                <Button @click="$emit('delete', data.id)" class="p-[5px]">
                    <svg class="size-[40px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"/></svg>
                </Button>
            </div>
        </div>
        
        <div class="card-bottom">
            <h6>{{ data.name }}</h6>
            <div class="card-bottom-date">
                <h6>Даты проведения:</h6>
                <p>{{ data.date }}</p>
                
            </div>
            <div class="card-bottom-button">
                <Button type="Router-Link" :link="`/tour/${data.id}`" class="p-[10px] text-[24px] font-bold">Открыть</Button>
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
    logged: {
        type: Boolean,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
    .card{
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        &-image{
            width: 100%;
            max-width: 100%;
            min-height: 280px;
            max-height: 280px;
            overflow: hidden;

            position: relative;
            img{
                width: inherit;
                min-height: inherit;
                max-height: inherit;
                object-fit: cover;  
            }
            .controls{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;

                position: absolute;
                top: 10px;
                right: 10px;

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
