export default {
    transform(rounds: any) {
        if (!rounds) {
            return null;
        }

        const totalRounds = rounds.length;

        let currentRound = [];
        let previousRound = [];

        for (let i = 0; i < totalRounds; i++) {
            currentRound = rounds[i].games.map((game: any) => {
                return {
                    ...game,
                    title: "round " + i,
                    games: [],
                    hasParent: !!rounds[i + 1],
                };
            });

            if (previousRound.length === 0) {
                previousRound = currentRound;
                continue;
            }

            for (let j = 0; j < previousRound.length; j++) {
                const matchForCurrentGame = Math.floor(j / 2);
                currentRound[matchForCurrentGame].games.push(previousRound[j]);
            }

            previousRound = currentRound;
        }
        console.log(currentRound);
        
        return currentRound[0] || null;
    },
    // transform(rounds: any) {
    //     console.log(rounds[0].games);
        
    //     if (!rounds || !rounds.games || rounds.games.length === 0) {
    //         return null;
    //     }
    
    //     // Создаем новый массив для текущего раунда.
    //     const currentRound = rounds.games.map((game: any, index: number) => {
    //         return {
    //             player1: game.player1,
    //             player2: game.player2,
    //             title: "Match " + (index + 1), // Название матча
    //             hasParent: true,
    //         };
    //     });
    
    //     // Здесь в случае, если нужно обработать предыдущие раунды,
    //     // можете внести изменения. Например, если хотите создавать дерево.
    //     console.log(currentRound);
        
    //     return currentRound;
    // }
    // transformFlatTree(games: any) {
    //     const mapOfGamesPerParent = {} as any;
    //     let root = null as any;

    //     games.forEach((game: any) => {
    //         if (!game.next && !root) {
    //             root = game;
    //             return;
    //         }

    //         if (!mapOfGamesPerParent[game.next]) {
    //             mapOfGamesPerParent[game.next] = [];
    //         }

    //         mapOfGamesPerParent[game.next].push(game);
    //     });

    //     const tree = {
    //         ...root,
    //         title: "round",
    //         games: [],
    //         hasParent: false,
    //     };

    //     return constructTree(tree, mapOfGamesPerParent, Object.keys(mapOfGamesPerParent).length);
    // },
};

function constructTree(tree: any, mapOfChildren: any, processedRound: any) {
    const totalChildren = mapOfChildren[tree.id] || [];

    tree.title = "round " + processedRound;

    for (let i = 0; i < totalChildren.length; i++) {
        const childGame = totalChildren[i];

        const treeChild = {
            ...childGame,
            title: `round ${[processedRound]}`,
            hasParent: true,
            games: [],
        };

        constructTree(treeChild, mapOfChildren, processedRound - 1);

        tree.games.push(treeChild);
    }

    return tree;
}