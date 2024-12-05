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
            
            const filteredData = _.filter(this.teams.current, { iteration: 0 });

            const aggregatedData = _.reduce(filteredData, (result: any, item: any) => {
                result[item.team] = (result[item.team] || 0) + item.points;
                return result;
            }, {});

            const resultArray = _.map(aggregatedData, (points, team) => ({ team, points }));
            
            const sortedData = _.sortBy(resultArray, 'points').reverse() as any;

            // Шаг 2: Назначаем уникальные классы в поле place для первых трех элементов
            for (let i = 0; i < 3; i++) {
                if (sortedData[i]) {
                    sortedData[i].place = i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze';
                }
            }
            
            return sortedData
            // return _.sortBy(_.filter(this.teams.current, {iteration: 0}), ['id'])
        },
        getFilteredAllTeams(): any {
            return _.sortBy(this.teams.current, ['id', 'iteration'])
        },
        getWinnerId(): any {
            const winner_normal = _.filter(this.teams.current, {lower: 0, win: 0})
            const winner_lower = _.filter(this.teams.current, {lower: 1, win: 0})
            
            console.log('WINNER_NORMAL_LENGTH', winner_normal.length);
            console.log('WINNER_LOWER_LENGTH', winner_lower.length);
            
            if (winner_normal.length === 1 && winner_lower.length === 1) {
                return {
                    normal: winner_normal[0].id,
                }
            }
            else if (winner_normal.length === 1 && winner_lower.length > 1) {
                return {
                    lower: winner_lower.length
                }
            }
            else if (winner_normal.length === 1) {
                return {
                    normal: winner_normal[0].id,
                    lower: null,
                }
            }
            else{
                return undefined
            }
        },
        getGeneratedBracket(): any {
            function genBracket(teams: any, maxIteration: any){
                const rounds = [] as any
                
                for (let iteration = 0; iteration <= maxIteration.iteration; iteration++) {                    
                    let allPlayers = _.chunk(_.filter(teams, {iteration: iteration}), 2)
                    
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
                }
    
                return rounds
            }


            const teams = this.getFilteredAllTeams

            const normalBracketTeams = _.filter(teams, {lower: 0})
            const lowerBracketTeams = _.filter(teams, {lower: 1})


            const maxIteration = _.maxBy(normalBracketTeams, 'iteration') as any; 
            let normal = genBracket(normalBracketTeams, maxIteration);


            let lower = null as any
            if (lowerBracketTeams.length > 0) {
                const maxIterationLower = _.maxBy(lowerBracketTeams, 'iteration') as any; 
                lower = genBracket(lowerBracketTeams, maxIterationLower);
            }
            

            return {normal, lower}
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