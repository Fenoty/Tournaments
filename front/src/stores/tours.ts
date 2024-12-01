import axios from 'axios';
import { defineStore } from 'pinia';

export const tourStore = defineStore('TourStore', {
    state: () => ({
        data: 'sdasdasdsadsa',
        error: null,
        tournaments: null as any,
    }),
    actions: {
        async getAllTour() {
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getAllTour`,
            })
            .then((response) => {                    
                response.data.map((item: any) => {
                    item.image = import.meta.env.VITE_STORAGE + item.image
                })
                this.tournaments = response.data
            })
            .catch((error) => console.log(error));

        },
        async getAllTourTeams(tourId: number) {
            const id = Number(tourId)
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getAllTourTeams`,
                params: {
                    id: id
                }
            })
            .then((response) => {  
                console.log(response);
                                  
                return response.data
            })
            .catch((error) => console.log(error));

        },
        async getCurrentTour(tourId: number) {
            const id = Number(tourId)
            if (!this.tournaments) {
                await this.getAllTour();
            }

            return await this.tournaments.filter((item: any) => item.id === Number(id))[0]
        },
    },
});