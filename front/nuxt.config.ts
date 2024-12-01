// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: "2024-04-03",
    devtools: {
        enabled: true,

        timeline: {
            enabled: false,
        },
    },
    plugins: [
        "~/plugins/pinia.js", 
    ],
    modules: [
        "@nuxtjs/axios", 
        "@nuxtjs/tailwindcss", 
        "@nuxt/icon", 
        "@nuxt/image", 
        "@pinia/nuxt"
    ],
    alias: {
        '@images': fileURLToPath(new URL('./assets/images', import.meta.url)),
        '@stores': fileURLToPath(new URL('./stores', import.meta.url)),
    },
    // lodash: {
    //     prefix: "_",
    //     prefixSkip: ["string"],
    //     upperAfterPrefix: false,
    //     exclude: ["map"],
    //     alias: [
    //         ["camelCase", "stringToCamelCase"], // => stringToCamelCase
    //         ["kebabCase", "stringToKebab"], // => stringToKebab
    //         ["isDate", "isLodashDate"], // => _isLodashDate
    //     ],
    // },
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