<template>
    <article class="card">
        <div class="card-image">
            <img src="@images/card/img.jpg" alt="">
        </div>
        
        <div class="card-bottom">
            <h6>{{index == 1 ? 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium odio vitae nihil aliquid voluptas, consequatur porro harum in veniam cum tempore delectus! Nesciunt ad esse voluptate nemo magni obcaecati doloribus.' : 'Турнир "Бла-Бла-Бла"'}}</h6>
            <div class="card-bottom-date">
                <ul>
                    <li>
                        <p>Дата начала:</p>
                        <span>14.10.2024</span>
                    </li>
                    <li>
                        <p>Дата начала:</p>
                        <span>14.10.2024</span>
                    </li>
                </ul>
            </div>
            <div class="card-bottom-button">
                <ButtonDefault type="Link" :link="`/tour/${index}`" class="p-[10px] text-[24px] font-bold">Открыть</ButtonDefault>
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
defineProps({
    index: {
        type: Number,
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
            min-height: 200px;
            max-height: 200px;
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
                align-items: flex-end;
                flex-grow: 1;
                ul{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    li{
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        gap: 10px;

                        font-size: 18px;
                        p{
                            font-weight: 600;
                        }
                    }
                }
            }
            &-button{
               
               
            }
        }
    }
</style>
