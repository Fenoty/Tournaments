<template>
    <div class="container">
        <div class="contacts">
            <h1>Контакты</h1>
            <ul>
                <li>
                    <p>ФИО Преподавателя:</p>
                    <span>Олейник Владимир Иванович</span>
                </li>
                <li>
                    <p>Телефон:</p>
                    <span><a href="tel:+7 (999) 999 99 99">+7 (999) 999 99 99</a></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .contacts{
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        h1{
            color: $color-4;
            font-size: 50px;
            font-weight: 600;
        }
        ul{
            display: flex;
            flex-direction: column;
            gap: 10px;
            li{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;

                font-size: 32px;
                p{
                    font-weight: 600;
                }
                span{
                    a{
                        transition: all .3s ease;
                        border-bottom: 1px solid transparent;
                        &:hover{
                            color: $color-1;
                        }
                    }
                }
            }
        }
    }
</style>
