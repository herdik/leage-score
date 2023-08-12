



let create_league = function(checkedTeams) {
    let leagueRounds = []
    let one_round = []
    let leagueRevengeRounds = []
    let revengeMatches = []
    let numOfRound = checkedTeams.length - 1
    let matchesInRound = teams.length / 2 
    let returnMatches = true
    
    
    
    for (let round = 0; round < numOfRound; round++) {
        for (let i = 0; i < matchesInRound; i++) {
            one_round.push({
                player1: checkedTeams[i], 
                score1: 3,
                player2 :checkedTeams[(checkedTeams.length -1) - i],
                score2: 2,
            })
            if (returnMatches) {
                revengeMatches.push({
                    player1: checkedTeams[(checkedTeams.length -1) - i],
                    score1: 3,
                    player2 : checkedTeams[i], 
                    score2: 2,
                })
            }
            // console.log(checkedTeams[i])
            // console.log(checkedTeams[(checkedTeams.length -1) - i])
        }
        leagueRounds.push(one_round)
        one_round = []
        if (returnMatches) {
            leagueRevengeRounds.push(revengeMatches)
            revengeMatches = []

        }
        checkedTeams.splice(1, 0, checkedTeams.pop())
        // ************
        // hore je jednoriadkový zápis
        // checkedTeams.splice(1, 0, checkedTeams[checkedTeams.length - 1])
        // checkedTeams.pop()
        // ************
        // checkedTeams.splice(-1) rovnaké ako checkedTeams.pop()
    }
    // console.log(leagueRounds[0][1].player1)
    console.log(leagueRounds)
    console.log(leagueRevengeRounds)
    return leagueRounds
}

create_league(["Herda", "Brázdil", "Katona", "Bajzík", "Kováč", "Vančo"])

// console.log(myLeague)


// 11 - 27 for (let round = 0; round < numOfRound; round++) {
//     for (let i = 0; i < matchesInRound; i++) {
//         one_round.push([checkedTeams[i], checkedTeams[(checkedTeams.length -1) - i]])
//         // console.log(checkedTeams[i])
//         // console.log(checkedTeams[(checkedTeams.length -1) - i])
//     }
//     checkedTeams.splice(1, 0, checkedTeams.pop())
//     // ************
//     // hore je jednoriadkový zápis
//     // checkedTeams.splice(1, 0, checkedTeams[checkedTeams.length - 1])
//     // checkedTeams.pop()
//     // ************
//     // checkedTeams.splice(-1) rovnaké ako checkedTeams.pop()
//     console.log(checkedTeams)

// }
// console.log(one_round)

