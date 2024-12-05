import _ from 'lodash';
import axios from 'axios';
import { defineStore } from 'pinia';

export const tourStore = defineStore('TourStore', {
    state: () => ({
        data: '',
        error: null,
        tournaments: null as any,
        teams: {
            current: null as any
        },
        searchValue: '' as string
    }),
    getters: {
        getFilteredTours(): any{
            return _.filter(this.tournaments, item => _.includes(_.toLower(item.name), _.toLower(this.searchValue)));
        },
        getOnlyTeams(): any {
            return _.filter(this.teams.current, {iteration: 0})
        },
        getGeneratedBracket(): any {
            const teams = this.teams.current
            const rounds = [] as any
            for (let iteration = 0; iteration <= teams[0].iteration; iteration++) {
        
                let allPlayers = _.chunk(_.filter(teams, {iteration: iteration}), 2)
                console.log('allPlayers',allPlayers);
                
                let games = [] as any
                allPlayers.forEach((chunk: any) => {
                    let game = {}
                    if (chunk.length == 2) {
                        game = {
                            player1: {
                                id: chunk[0].team.toString(),
                                team_id: chunk[0].id.toString(),
                                name: chunk[0].team,
                                winner: chunk[0].win,
                                score: chunk[0].points,
                            },
                            player2: {
                                id: chunk[1].team.toString(),
                                team_id: chunk[1].id.toString(), // Пример, взять следующего игрока
                                name: chunk[1].team,
                                winner: chunk[1].win, // Условие по вашему требованию
                                score: chunk[1].points,
                            }
                        };
                    }
                    else{
                        game = {
                            player1: {
                                id: chunk[0].team.toString(),
                                team_id: chunk[0].id.toString(),
                                name: chunk[0].team,
                                winner: chunk[0].win,
                                score: chunk[0].points,
                            },
                            player2: {
                                id: null,
                                team_id: null,
                                name: '?',
                                winner: false,
                                score: 0,
                            },
                        };
                    }
                    games.push(game)
                });
                console.log('games', games);
                rounds.push({
                    games: games,
                    round: iteration
                })
                console.log('rounds', rounds);
            }
        
            return rounds
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
                this.teams.current = response.data
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