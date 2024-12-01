<template>
    <div class="container login-container">
        <div class="login">
            <h1>Авторизация</h1>
            <form class="login-form">
                <label>
                    Логин
                    <input v-model="username" placeholder="Логин" type="text">
                </label>
                <label>
                    Пароль
                    <input v-model="password" placeholder="********" type="password">
                </label>
                <Button @click.prevent="submitForm" class="p-[16px] font-bold" :class="{'disabled': disabled}">Войти</Button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Button from '@components/button/Default.vue'
import { adminStore } from '@/stores/admin';
import { ref, computed, onMounted, watch } from 'vue';

import router from '@/router';

const username = ref('')
const password = ref('')
const disabled = computed(() => {
    return (username.value.length > 3 && password.value.length > 3) ? false : true
})


const adminStorage = adminStore()
const isLoggedIn = computed(() => adminStorage.isLoggedIn)

if (isLoggedIn.value) {
    router.push({path: '/'})
}

const submitForm = async () => {
    if (username.value.length > 3 && password.value.length > 3) {
        if (await adminStorage.auth(username.value, password.value)) {
            router.push({path: '/'})
        } 
    }
}



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
            &.disabled{
                cursor: auto;
                background: gray;
            }
        }
    }
}
</style>
