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
            return _.sortBy(_.filter(this.teams.current, {iteration: 0}), ['id'])
        },
        getFilteredAllTeams(): any {
            return _.sortBy(this.teams.current, ['id', 'iteration'])
        },
        getGeneratedBracket(): any {
            const teams = this.getFilteredAllTeams
            const maxIteration = _.maxBy(teams, 'iteration') as any;            

            const rounds = [] as any
            for (let iteration = 0; iteration <= maxIteration.iteration; iteration++) {
        
                let allPlayers = _.chunk(_.filter(teams, {iteration: iteration}), 2)
                console.log('allPlayers',allPlayers);
                
                let games = [] as any
                allPlayers.forEach((chunk: any) => {
                    let game = {}
                    if (chunk.length == 2) {
                        game = {
                            player1: {
                                id: chunk[0].id,
                                team_id: chunk[0].id.toString(),
                                name: chunk[0].team,
                                winner: chunk[0].win,
                                score: chunk[0].points,
                            },
                            player2: {
                                id: chunk[1].id,
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
                                id: chunk[0].id,
                                team_id: chunk[0].id.toString(),
                                name: chunk[0].team,
                                winner: chunk[0].win,
                                score: chunk[0].points,
                            },
                            player2: {
                                id: null,
                                team_id: null,
                                name: '?',
                                winner: 0,
                                score: 0,
                            },
                        };
                    }
                    games.push(game)
                });
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