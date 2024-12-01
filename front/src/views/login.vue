<template>
    <div class="container login-container">
        <div class="login">
            <h1>Авторизация</h1>
            <form class="login-form">
                <label>
                    Логин
                    <input placeholder="Логин" type="text" pl>
                </label>
                <label>
                    Пароль
                    <input placeholder="********" type="password" pl>
                </label>
                <Button class="p-[16px] font-bold">Войти</Button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Button from '@components/button/Default.vue'

</script>

<style lang="scss">
.login-container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login{
    width: 100%;
    max-width: 800px;

    display: flex;
    flex-direction: column;
    gap: 40px;

    background: rgba(2, 89, 89, 0.1);
    padding: 60px;
    h1{
        font-size: 50px;
        font-weight: 600;
        text-align: center;
    }
    .login-form{
        display: flex;
        flex-direction: column;
        gap: 32px;
        label{
            display: flex;
            flex-direction: column;
            gap: 8px;

            font-size: 32px;
            input{
                border: 1px solid $color-1;
                padding: 16px;
                font-size: 24px;
                outline: none;

                transition: all .3s ease;
                &:focus{
                    background: $white;
                }
            }
        }
        button{
            font-size: 32px;
        }
    }
}
</style>
