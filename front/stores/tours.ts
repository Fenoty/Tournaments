import { defineStore } from "pinia";

export const tourStore = defineStore("TourStore", {
    state: () => ({
      val: 0 as number
    }),
    getters: {
        // getUsers(state){
        //   return state.user
        // }
    },
    actions: {
        async getTours(){
            const { $axios } = useNuxtApp()
            console.log(this.val);
            //@ts-ignore
            const data = await $axios.$get(`${import.meta.env.API_URL}/api/getAllTour`)
        },
    },
});

