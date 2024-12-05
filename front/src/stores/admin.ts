import _ from 'lodash';
import axios from 'axios';
import { defineStore } from 'pinia';
import { promiseAlert } from '@/notification/answers';
import { tourStore } from '@stores/tours';

export const adminStore = defineStore('AdminStore', {
    state: () => ({
        isLoggedIn: false as boolean,
    }),
    actions: {
        setCookie(name: string, value: string, days: number) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        },
        getCookie(name: string) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        async checkAuth() {
            const logged = this.getCookie("admin")
            console.log(logged);
            this.isLoggedIn = logged && logged === "logged" ? true : false
        },
        async logout() {
            this.setCookie("admin", '', 0)
            const logged = this.getCookie("admin")
            this.isLoggedIn = logged && logged === "logged" ? true : false
        },
        async auth(username: string, password: string) {

            const promise = axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/auth`,
                data: {
                    username: username,
                    password: password
                }
            })

            return await promiseAlert(promise,
                'Авторизация...',
                'Успешная авторизация',
                'Произошла ошибка',
            )
            .then(async (response) => {      
                if (response.status) {
                    this.setCookie(username, 'logged', 7)
                    this.isLoggedIn = true

                    return true;
                }
                return false;
            })
            .catch((error) => console.log(error));
        },


        // Edit tours
        async saveEditTour(data: any) {

            const promise = axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/saveEditTour`,
                data: {
                    id: data.id,
                    name: data.name,
                    date: data.date,
                    url: data.url,
                    description: data.description,
                }
            })

            return await promiseAlert(promise,
                'Турнир удаляется...',
                'Турнир удален',
                'Произошла ошибка',
            )
            .then(async (response) => {      
                const tourStorage = tourStore()  

                await response.map((item: any) => {
                    item.image = import.meta.env.VITE_STORAGE + item.image
                })            
                
                tourStorage.tournaments = response
                
            })
            .catch((error) => console.log(error));
        },
        async deleteTour(tourId: number) {
            const promise = axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/deleteTour`,
                data: {
                    id: tourId,
                }
            })

            return await promiseAlert(promise,
                'Турнир удаляется...',
                'Турнир удален',
                'Произошла ошибка',
            )
            .then(async () => {      
                const tourStorage = tourStore()  
                _.remove(tourStorage.tournaments, {id: tourId})      
            })
            .catch((error) => console.log(error));

        },
        async createTour(data: any) {
            let formData = new FormData();
            formData.append('name', data.name); 
            formData.append('date', data.date); 
            formData.append('image', data.image.file); 
            formData.append('description', data.description); 
            formData.append('url', data.url); 
            formData.append('price_place', data.price_place); 
            formData.append('grid_type', data.grid_type); 


            if (data.teams) {
                formData.append('teams', data.teams); 
                formData.append('random', data.random); 
            }

            try {
                const promise = axios({
                    method: "post",
                    url: `${import.meta.env.VITE_API_URL}/createTour`,
                    headers: {
                        'Content-Type': 'multipart/form-data' // Указываем, что это форма
                    },
                    data: formData
                })

                return await promiseAlert(promise,
                    'Турнир создается...',
                    'Турнир создан',
                    'Произошла ошибка',
                )
                .then(async (response) => {      
                    const tourStorage = tourStore() 
                
                    await response.map((item: any) => {
                        item.image = import.meta.env.VITE_STORAGE + item.image
                        tourStorage.tournaments.unshift(item)
                    })        
                })
                .catch((error) => console.log(error));

            } catch (error) {
                console.log(error);
                
            }
        },


        // BRACKETS
        async editTeamScore(teamId: number, score: number) {
            const promise = axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/editTeamScore`,
                data: {
                    teamId,
                    score
                }
            })

            return await promiseAlert(promise,
                'Меняем очки...',
                'Очки изменены',
                'Произошла ошибка',
            )
            .then(async (response) => {      
                const tourStorage = tourStore()

                await tourStorage.teams.current.map((item: any) => {
                    if (item.id === teamId) {
                        item.points = score
                    }
                })     
            })
            .catch((error) => console.log(error));
        },
        async setWinnerRound(tourId: any, winner: any, looser: any, iter: any, type: boolean, gridType: string) {
            const promise = axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/setWinnerRound`,
                data: {
                    iter,
                    tourId,
                    winner,
                    looser,
                    type,
                    gridType,
                }
            })

            return await promiseAlert(promise,
                'Определяем победитея...',
                'Победитель определен',
                'Произошла ошибка',
            )
            .then(async (response) => {
                console.log(response);
                const tourStorage = tourStore()     
                
                await tourStorage.teams.current.map((item: any) => {
                    if (Number(item.id) === Number(looser.team_id)) {
                        item.win = 2
                    }
                    else if (Number(item.id) === Number(winner.team_id)) {
                        item.win = 1
                    }
                })  
                tourStorage.teams.current.push(response.normal[0])

                if (response.lower) {
                    tourStorage.teams.current.push(response.lower[0])
                }
            })
            .catch((error) => console.log(error));
        },
    },
});