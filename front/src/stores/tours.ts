import _ from 'lodash';
import axios from 'axios';
import { defineStore } from 'pinia';

export const tourStore = defineStore('TourStore', {
    state: () => ({
        data: 'sdasdasdsadsa',
        error: null,
        tournaments: null as any,
        searchValue: '' as string
    }),
    getters: {
        getFilteredTours(): any{
            return _.filter(this.tournaments, item => _.includes(_.toLower(item.name), _.toLower(this.searchValue)));
        }
    },
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
            return await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}/getAllTourTeams`,
                params: {
                    id: tourId
                }
            })
            .then((response) => {  
                console.log(response);
                                  
                return response.data
            })
            .catch((error) => console.log(error));

        },
        async getCurrentTour(tourId: number) {
            if (!this.tournaments) {
                await this.getAllTour();
            }

            return await this.tournaments.filter((item: any) => item.id === tourId)[0]
        },
    },
});