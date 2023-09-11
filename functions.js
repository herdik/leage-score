// Main text to header
mainText = `BK MANILA " Z-scoreboard "`

// ***function to repeat and print name of league system
let indexLetter = 1
let speed = 250

let repeatingText = function(){
    document.querySelector(".main-container h1").textContent = mainText.slice(0, indexLetter)
    indexLetter ++

    indexLetter > mainText.length ? indexLetter = 1 : indexLetter = indexLetter
    
    setTimeout(repeatingText, speed)
}


// function to print name of the league in "div leagueHeading"

document.querySelector("#leagueName-form").addEventListener("submit", (event) => {
    event.preventDefault()
    let nameOfLeague = event.target.leagueName.value

    event.target.leagueName.value = ""
    saveLeagueNameLocalStorage(nameOfLeague)
    document.querySelector(".leagueHeading").classList.remove("hide")
    document.querySelector(".leagueHeading h1").innerHTML = `
    ${nameOfLeague}
    <span class="left-icon"></span>
    <span class="right-icon"></span>
    `
    
})

// Save league system settings to Local Storage
let saveLeagueSystemSettings = (setLeagueSystem) => {
    localStorage.setItem("leagueSystem", JSON.stringify(setLeagueSystem))
}
// Get league system settings from Local Storage
let getLeagueSystemSettings = () => {
    let leagueSystemToParset = localStorage.getItem("leagueSystem")

    if (leagueSystemToParset !== null){
        return JSON.parse(leagueSystemToParset)
    } else {
        return []
    }
}

// Save league Name to Local Storage
let saveLeagueNameLocalStorage = (nameOfLeague) => {
    localStorage.setItem("headingLeague", JSON.stringify(nameOfLeague))
}
// Get league Name from Local Storage
let getLeagueName = () => {
    let leagueToParset = localStorage.getItem("headingLeague")

    if (leagueToParset !== null){
        return JSON.parse(leagueToParset)
    } else {
        return []
    }
}


// Prístup k všetkým registrovaným gráčom, ak nie sú hráči vytvorí sa pre nich pole

let getRegisteredPlayers = () => {
    let regPlayersToParset = localStorage.getItem("registeredPlayers")

    if (regPlayersToParset !== null) {
        return JSON.parse(regPlayersToParset)
    } else {
        return []
    }
}


// uloženie registrovaných hráčov do localStorage - registeredPlayers

let saveRegisteredPlayers = (regPlayers) => {
    
    localStorage.setItem("registeredPlayers", JSON.stringify(regPlayers))
}


// Funkcia na vytvorenie HTML štruktúry pre Zoznam Hráčov

let generateHTMLstructure = (newRegPlayer, playingSystem) => {
    if (registeredPlayersArray.length > 0) {
        // Ak existuje aspoň jeden hráč odober display none
        document.querySelector(".second-container").classList.remove("hide")

    }

    // vytvorenie delete button pre vymazanie hráča z second-container - "Zoznam hráčov"
    let removeBtnPlayer = document.createElement("button")
    let playingname = newRegPlayer.firstName + " " + newRegPlayer.secondName
    if(playingSystem === "doubles"){
        playingname = newRegPlayer.firstName + " - " + newRegPlayer.secondName
    }
    removeBtnPlayer.classList.add("removeBtn")
    removeBtnPlayer.innerHTML = "Vymazať<br>hráča"

    let newLi = document.createElement("li")

    newLi.innerHTML = `
            <img src="img/slovakia-flag.png" alt="slovakia-flag">
            <div class="player-informations">
                <h3>${playingname}</h3>
                <p>${newRegPlayer.playersClub}</p>
            </div>`
    newLi.appendChild(removeBtnPlayer)

    // na každý remove Button je naviazaný addeventlistener
    removeBtnPlayer.addEventListener("click", () => {
        // called Funkcia pre vymazanie vybraného hráča po kliknutí na tlačítko vymazať
        removeSelectedPlayer(newRegPlayer.id, registeredPlayersArray)
    })

    return newLi
}

// Funkcia pre vymazanie vybraného hráča

let removeSelectedPlayer = function(selectPlayerId, regAllPlayers){
    // registeredPlayersArray = getRegisteredPlayers()

    let toDeleteIndex = regAllPlayers.findIndex(findedPlayer)
    function findedPlayer(myID) {
        return myID.id === selectPlayerId;
      }
    
    if (toDeleteIndex > -1) { 
        regAllPlayers.splice(toDeleteIndex, 1)
        saveRegisteredPlayers(registeredPlayersArray)
        printRegPlayers()
        if (regAllPlayers.length <= 0){
            document.querySelector(".second-container").classList.add("hide")
        }
      }
    
}

// funkcia pre vykreslenie hráčov do zoznamu po otvorení prehliadača/stránky
let printRegPlayers = () => {
    if (localStorage.getItem("registeredPlayers") !== null) {
        // // Vymazanie vnútra html pre zamedzenie opakovaného vypísania rovnakého hráča
        document.querySelector(".registered-players-list").innerHTML = ""

        // let parsetPlayers = JSON.parse(localStorage.getItem("registeredPlayers"))
        let parsetPlayers = getRegisteredPlayers()
        
        parsetPlayers.forEach((onePlayer) => {
        
        let oneHTML = generateHTMLstructure(onePlayer, MainLeagueSettings[1])

        document.querySelector(".registered-players-list").appendChild(oneHTML)

        });
    }
}

// Prístup ku všetkým ligovým zápasom, ak nie sú zápasy, tak vytvorí sa pre ne pole

let getLeagueMatches = () => {
    let leagueMatchesToParset = localStorage.getItem("league")

    if (leagueMatchesToParset !== null) {
        return JSON.parse(leagueMatchesToParset)
    } else {
        return []
    }
}


// uloženie všetkým ligových zápasov do localStorage - leagueMatches

let saveLeagueMatches = (allLeagueMatches) => {
    
    localStorage.setItem("league", JSON.stringify(allLeagueMatches))
}

// Zavolanie funkcie kde je ligová tabuľka so všetkými hráčmi a výsledkami, v prípade ak neexistujú, tak sa vytvorí prázdne pole

let getLeagueTable = () => {
    let leagueTableToParset = localStorage.getItem("table")

    if (leagueTableToParset !== null) {
        return JSON.parse(leagueTableToParset)
    } else {
        return []
    }
}

// uloženie všetkých výsledkov ligových zápasov do localStorage - leagueTable

let saveLeagueTable = (allLeagueTable) => {
    
    localStorage.setItem("table", JSON.stringify(allLeagueTable))
}



// vytvorenie ligových zápasov funkcia
let create_league = function(checkedTeams, revengeMatch) {
    
    // let leagueRounds = []
    let one_round = []
    let leagueRevengeRounds = []
    let revengeMatches = []
    let numOfRound = checkedTeams.length - 1
    let matchesInRound = checkedTeams.length / 2 
    let returnMatches = revengeMatch
    
    
    for (let round = 0; round < numOfRound; round++) {
        for (let i = 0; i < matchesInRound; i++) {
            one_round.push({
                matchStart: false,
                matchFinished: false,
                matchRegistered: false,
                matchId: uuidv4(),
                player1: checkedTeams[i].player,
                player1Id: checkedTeams[i].playerId, 
                score1: 0,
                player2: checkedTeams[(checkedTeams.length -1) - i].player,
                player2Id: checkedTeams[(checkedTeams.length -1) - i].playerId,
                score2: 0,
            })
            if(one_round[i].player1 === "Voľno" || one_round[i].player2 === "Voľno"){
                one_round[i].matchFinished = true
                one_round[i].matchStart = true}
            if (returnMatches) {
                revengeMatches.push({
                    matchStart: false,
                    matchFinished: false,
                    matchRegistered: false,
                    matchId: uuidv4(),
                    player1: checkedTeams[(checkedTeams.length -1) - i].player,
                    player1Id: checkedTeams[(checkedTeams.length -1) - i].playerId,
                    score1: 0,
                    player2: checkedTeams[i].player,
                    player2Id: checkedTeams[i].playerId, 
                    score2: 0,
                })
                if(returnMatches[i].player1 === "Voľno" || returnMatches[i].player2 === "Voľno") {
                    returnMatches[i].matchFinished = true
                    returnMatches[i].matchStart = true}
            }
            
        }
        leagueMatches.push(one_round)
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
    
    if (returnMatches) {
        leagueRevengeRounds.forEach((oneObject) => {
            leagueMatches.push(oneObject)
        })
    }

    // return leagueRounds
       
}

// html štruktúra pre div leagueRound, ktorý vložíme do league-matches s headingom h1 s príšlušným kolom
let generateLeagueRoundDiv = (roundNum) =>{
    let numberOfRound = roundNum
    const leagueRoundDiv = document.createElement("div")
    leagueRoundDiv.classList.add("leagueRound")

    const headingRoundNumber = document.createElement("h1")
    headingRoundNumber.textContent = `${numberOfRound}.kolo`
    
    leagueRoundDiv.appendChild(headingRoundNumber)

    return leagueRoundDiv

}

// html štruktúra pre div general-match, teda pre každý zápas, ktorý vložíme pod heading h1 s príšlušným kolom do divu league-matches
let generateGeneralMatchDiv = (everyMatch) => {
    const generalMatchDiv = document.createElement("div")
    generalMatchDiv.classList.add("general-match")
    
    let spanpl1 = document.createElement("span")
    spanpl1.classList.add("pl1-span")
    let spanpl2 = document.createElement("span")
    spanpl2.classList.add("pl2-span")

    let labelpl1 = document.createElement("label")
    labelpl1.classList.add("pl1-label")
    let labelpl2 = document.createElement("label")
    labelpl2.classList.add("pl2-label")

    const button = document.createElement("button")
    button.textContent = "Zapnúť"

    // Ako náhle vytvorím nový div tak bude hned naň naviazaný addeventlistener, ktorý má v sebe funkciu na vymazanie

    button.addEventListener("click", function(event){ 
        if (button.textContent === "Upraviť"){
            let leagueIndexes2 = getIndexSelectedMatch(leagueMatches, everyMatch.matchId)
            // Funckia pre zmenu stavu aktívneho zápasu
            modifyModal(leagueMatches[leagueIndexes2[0]][leagueIndexes2[1]])
            
        } else if (button.textContent === "Zapnúť") {
            generalMatchDiv.classList.add("activeLeagueMatch")
            button.textContent = "Upraviť"
            let leagueIndexes = getIndexSelectedMatch(leagueMatches, everyMatch.matchId)
            leagueMatches[leagueIndexes[0]][leagueIndexes[1]].matchStart = true
            saveLeagueMatches(leagueMatches)
        } 
    })

    if (everyMatch.matchStart) {
        generalMatchDiv.classList.add("activeLeagueMatch")
        button.textContent = "Upraviť"
    } 
    if (everyMatch.matchFinished){
        generalMatchDiv.classList.remove("activeLeagueMatch")
        generalMatchDiv.classList.add("fisnishedLeagueMatch")
        button.textContent = "Ukončiť"
        generateHtmlPrintLeagueTable(leagueTable, leagueMatches)
    }

    spanpl1.textContent = everyMatch.player1
    labelpl1.textContent = everyMatch.score1
    
    labelpl2.textContent = everyMatch.score2
    spanpl2.textContent = everyMatch.player2

    generalMatchDiv.appendChild(spanpl1)
    generalMatchDiv.appendChild(labelpl1)
    generalMatchDiv.appendChild(button)
    generalMatchDiv.appendChild(labelpl2)
    generalMatchDiv.appendChild(spanpl2)

    return generalMatchDiv

}

// Funckia pre zapnutie vybraného zápasu a zmena matchStart na true a zmena pozadia aktívneho zápasu
let getIndexSelectedMatch = (allMatches, matchID) => {
    let indexArray = []
    allMatches.forEach((oneRound, mainIndex) => {
        let index = oneRound.findIndex((matchStatusStart) => {
            if (matchStatusStart.matchId === matchID) {
                indexArray.push(mainIndex)
                return matchStatusStart.matchId === matchID
            }
            
        })
        if (index > -1) {
            indexArray.push(index)
        }
        
    })

    if (indexArray.length === 2){  
        return indexArray
         
    }
    
}

// Vytvorenie globálnej premennej pre preukladanie aktuálneho vybraného zápasu - selectedMatch
let currentEditedMatch

// editácia a poslanie hodnôt z modal dialog window a uloženie ich do leagueMatches a zatvorenie modal dialog window
document.querySelector("#matchForm").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()

    // po odoslaní formulára záskanie hodnôt z modal window
    let checkbox = event.target.checkFinish.checked
    let playerScore1 = event.target.score1.value
    let playerScore2 = event.target.score2.value
    
    // currentEditedMatch je premenná kde je preuložený selectedMatch, teda aktuálny vybraný zápas z leagueMatches
    currentEditedMatch.score1 = playerScore1
    currentEditedMatch.score2 = playerScore2
    if (checkbox) {
        currentEditedMatch.matchFinished = checkbox
        currentEditedMatch.matchStart = false
    }

    // uloženie zmien v league LocalStorage
    saveLeagueMatches(leagueMatches)
    // Vykreslenie zmien na stránku z league LocalStorage
    printLeagueMatches()

    const modalWindow = document.querySelector("#modal")
    modalWindow.close()

    // defaultné hodnoty
    event.target.checkFinish.checked = false

})

// Funckia pre zobrazenie vybraného zápasu aktívneho zápasu zavolaním modal dialog window, kde sa načítajú hodnoty zo selectedMatch
let modifyModal = (selectedMatch) => {
    // uloženie do globálnej premennej aktuálny selectedMatch
    currentEditedMatch = selectedMatch

    let firstPlayer = selectedMatch.player1
    let firstPlayerScore = selectedMatch.score1
    let secondPlayer = selectedMatch.player2
    let secondPlayerScore = selectedMatch.score2
    const modalWindow = document.querySelector("#modal")

    document.querySelector(".pl1-span").textContent = firstPlayer
    document.querySelector(".pl1-label").value = firstPlayerScore
    document.querySelector(".pl2-span").textContent = secondPlayer
    document.querySelector(".pl2-label").value = secondPlayerScore
    
    modalWindow.showModal()

}


// funkcia pre vykreslenie ligových zápasov do div .league-matches po otvorení prehliadača/stránky
let printLeagueMatches = () => {

    if (localStorage.getItem("league") !== null){

        // Vymazanie vnútra html pre zamedzenie opakovaného vypísania ligových zápasov
        document.querySelector(".league-matches").innerHTML = ""

        let parsetLeagueMatches = getLeagueMatches()

        parsetLeagueMatches.forEach((oneRound, index) => {

            // html štruktúra pre div leagueRound, ktorý vložíme do league-matches s headingom h1 s príšlušným kolom
            let roundNumber = index + 1
            let divLeagueRound = generateLeagueRoundDiv(roundNumber)
            document.querySelector(".league-matches").appendChild(divLeagueRound)
        
            oneRound.forEach((oneMatch) => {
                let divGeneralMatch = generateGeneralMatchDiv(oneMatch)
                divLeagueRound.appendChild(divGeneralMatch)
        
            })
        })

    }
}

// funkcia pre vykreslenie tabuľky výsledkov ligových zápasov do div .result-container +  results-table po otvorení prehliadača/stránky
let generateHtmlPrintLeagueTable = (tableInfo, leagueInfo) => {

    if (leagueInfo.length > 0){
        leagueInfo.forEach((oneRound) => {
            oneRound.find(function(oneMatch){
                if (oneMatch.matchFinished === true && oneMatch.matchRegistered != true){
                    let played = 1
                    let points = 3
                    let findedPlayer1 = oneMatch.player1Id
                    let findedScore1 = oneMatch.score1
                    let findedPlayer2 = oneMatch.player2Id
                    let findedScore2 = oneMatch.score2
                    let activeMatch = oneMatch.matchStart
                    
                    tableInfo.find(function(onePlayer){
                        if(onePlayer.playerId === findedPlayer1 && activeMatch === false){
                            onePlayer.playedMatches += played
                            onePlayer.wins += Number(findedScore1)
                            onePlayer.losses += Number(findedScore2)
                            onePlayer.difference = onePlayer.wins - onePlayer.losses
                
                            if (Number(findedScore1) > Number(findedScore2)){
                                onePlayer.points += points
                            }
                            
                        }
                        if(onePlayer.playerId === findedPlayer2 && activeMatch === false){
                            onePlayer.playedMatches += played
                            onePlayer.wins += Number(findedScore2)
                            onePlayer.losses += Number(findedScore1)
                            onePlayer.difference = onePlayer.wins - onePlayer.losses
                            
                            if (Number(findedScore2) > Number(findedScore1)){
                                onePlayer.points += points
                            }
                            
                        }
                    })
                    oneMatch.matchRegistered = true
                    saveLeagueMatches(leagueMatches)
                    saveLeagueTable(leagueTable)
                }
            })

        })
    }  
    // Usporiadanie tabuľky podľa nastavených kritérií - 1.Body,  2.rozdiel skóre 
    sortsTable(leagueTable)

    if (localStorage.getItem("table") !== null){
        const tableDiv = document.querySelector(".results-table tbody")
    tableDiv.innerHTML = ""
    
    tableInfo.forEach((onePlayer, number) => {
        const tbodyTr = document.createElement("tr")
        tbodyTr.innerHTML = `
        <td>${number + 1}</td>
        <td>${onePlayer.playerName}</td>
        <td>${onePlayer.playedMatches}</td>
        <td>${onePlayer.wins}</td>
        <td>${onePlayer.losses}</td>
        <td>${onePlayer.difference}</td>
        <td>${onePlayer.points}</td>
        `
        tableDiv.append(tbodyTr)
    })
    }  
}

// Usporiadanie tabuľky podľa nastavených kritérií - 1.Body,  2.rozdiel skóre
let sortsTable = function(myTable){
    myTable.sort(function(a, b){
        if(b.points < a.points){
            return -1
        } else if (a.points < b.points){
            return 1
        } else if (a.points === b.points)
            if(b.difference < a.difference){
                return -1
            } else if (a.difference < b.difference){
                return 1
            }
    })
}
