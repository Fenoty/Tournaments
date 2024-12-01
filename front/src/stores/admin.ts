import _ from 'lodash';
import axios from 'axios';
import { defineStore } from 'pinia';
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
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/auth`,
                data: {
                    username: username,
                    password: password
                }
            })
            .then((response) => {                    
                if (response.data.status) {
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
            console.log(data);
            
            return await axios({
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
            .then(async (response) => {      
                const tourStorage = tourStore()  

                await response.data.map((item: any) => {
                    item.image = import.meta.env.VITE_STORAGE + item.image
                })            
                
                tourStorage.tournaments = response.data
                
            })
            .catch((error) => console.log(error));
        },
        async deleteTour(tourId: number) {
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/deleteTour`,
                data: {
                    id: tourId,
                }
            })
            .then(async () => {      
                const tourStorage = tourStore()  
                _.remove(tourStorage.tournaments, {id: tourId})                
            })
            .catch((error) => console.log(error));
        },
        async createTour(data: any) {
            console.log(data);

            let formData = new FormData();
            formData.append('name', data.name); 
            formData.append('date', data.date); 
            formData.append('image', data.image.file); 
            formData.append('description', data.description); 
            formData.append('url', data.url); 
            formData.append('price_place', data.price_place); 
            formData.append('grid_type', data.grid_type); 
           
            console.log(...formData.entries());
            
            return await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/createTour`,
                headers: {
                    'Content-Type': 'multipart/form-data' // Указываем, что это форма
                },
                data: formData
            })
            .then(async (response) => {      
                console.log(response);
                              
            })
            .catch((error) => console.log(error));
        },
    },
});