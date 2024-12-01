import axios from 'axios';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    // Настройки Axios (опционально)
    const axiosInstance = axios.create({
        baseURL: import.meta.env.API_URL,  // Замените на ваш базовый URL
    });

    // Добавляем экземпляр axios в контекст приложения
    nuxtApp.provide('axios', axiosInstance);
});