// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: "2024-04-03",
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/image"],
    alias: {
        '@images': fileURLToPath(new URL('./assets/images', import.meta.url))
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "~/assets/styles/_variables.scss" as *;',
                },
            },
        },
    },
});