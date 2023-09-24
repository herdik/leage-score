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


// Prístup k všetkým registrovaným teamom, ak nie sú teamy vytvorí sa pre nich pole

let getRegisteredTeams = () => {
    let regTeamsToParset = localStorage.getItem("registeredTeams")

    if (regTeamsToParset !== null) {
        return JSON.parse(regTeamsToParset)
    } else {
        return []
    }
}


// uloženie registrovaných teamov do localStorage - registeredTeams

let saveRegisteredTeams = (regTeams) => {
    
    localStorage.setItem("registeredTeams", JSON.stringify(regTeams))
}


// Funkcia na vytvorenie HTML štruktúry pre Zoznam Hráčov

let generateHTMLstructure = (newRegPlayer, playingSystem) => {
    let playingName
    let clubName
    if (registeredPlayersArray.length > 0 || registeredTeamsArray.length > 0) {
        // Ak existuje aspoň jeden hráč alebo team odober class hide pre skrytie zoznamu hráčov
        document.querySelector(".second-container").classList.remove("hide")
    }

    // vytvorenie delete button pre vymazanie hráča z second-container - "Zoznam hráčov"
    let removeBtnPlayer = document.createElement("button")
    
    playingName = playingSystem === "teams"? newRegPlayer.teamName : newRegPlayer.firstName + " " + newRegPlayer.secondName
    if(playingSystem === "doubles"){
        playingName = newRegPlayer.firstName + " - " + newRegPlayer.secondName
    }
    removeBtnPlayer.classList.add("removeBtn")
    removeBtnPlayer.innerHTML = "Vymazať<br>hráča"

    clubName = playingSystem === "teams"? "Klub" : newRegPlayer.playersClub

    let newLi = document.createElement("li")

    newLi.innerHTML = `
            <img src="img/slovakia-flag.png" alt="slovakia-flag">
            <div class="player-informations">
                <h3>${playingName}</h3>
                <p>${clubName}</p>
            </div>`
    newLi.appendChild(removeBtnPlayer)

    // na každý remove Button je naviazaný addeventlistener
    removeBtnPlayer.addEventListener("click", () => {
        // called Funkcia pre vymazanie vybraného hráča alebo team po kliknutí na tlačítko vymazať 
        playingSystem === "teams" ? removeSelectedPlayer(newRegPlayer.id, registeredTeamsArray, MainLeagueSettings[1]) : removeSelectedPlayer(newRegPlayer.id, registeredPlayersArray, MainLeagueSettings[1])
        
    })

    return newLi
}

// Funkcia pre vymazanie vybraného hráča

let removeSelectedPlayer = function(selectPlayerId, regAllPlayers, playingSystem){
    
    let toDeleteIndex = regAllPlayers.findIndex(findedPlayer)
    function findedPlayer(myID) {
        return myID.id === selectPlayerId;
      }
    
    if (toDeleteIndex > -1) { 
        regAllPlayers.splice(toDeleteIndex, 1)
        playingSystem === "teams" ? saveRegisteredTeams(registeredTeamsArray) : saveRegisteredPlayers(registeredPlayersArray)
        printRegPlayers(MainLeagueSettings[1])
        if (regAllPlayers.length <= 0){
            document.querySelector(".second-container").classList.add("hide")
        }
      }
    
}

// funkcia pre vykreslenie hráčov do zoznamu po otvorení prehliadača/stránky
let printRegPlayers = (playingSystem) => {
    if(playingSystem !== "teams"){
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
    }else {
        if (localStorage.getItem("registeredTeams") !== null) {
            // // Vymazanie vnútra html pre zamedzenie opakovaného vypísania rovnakého hráča
            document.querySelector(".registered-players-list").innerHTML = ""

            let parsetPlayers = getRegisteredTeams()
            
            parsetPlayers.forEach((onePlayer) => {
            
            let oneHTML = generateHTMLstructure(onePlayer, MainLeagueSettings[1])

            document.querySelector(".registered-players-list").appendChild(oneHTML)

            });
        }
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

// vytvorenie podzápasov pre Ligu teamov
let createUnderTeamLeague = () => {
    let underMatchesArray = []
    let playerInMatch
    for (let round = 0; round < 6; round++) {
        playerInMatch = round % 2 === 0 ? "Jednotlivec" : "Dvojica"
        underMatchesArray.push({                
            matchStart: false,
            matchFinished: false,
            matchRegistered: false,
            matchId: uuidv4(),
            player1: playerInMatch,
            player1Id: "Neznáme", 
            score1: 0,
            player2: playerInMatch,
            player2Id: "Neznáme",
            score2: 0,
            underMatches: "oneUnderMatch",
        })
    }
    return underMatchesArray
}


// vytvorenie ligových podzápasov pre teamy funkcia
let createLeague = function(checkedTeams, revengeMatch, playingSetting) {
    
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
                playersTeam1: false,
                score1: 0,
                player2: checkedTeams[(checkedTeams.length -1) - i].player,
                player2Id: checkedTeams[(checkedTeams.length -1) - i].playerId,
                playersTeam2: false,
                score2: 0,
                underMatches: false, 
            })
            if(one_round[i].player1 === "Voľno" || one_round[i].player2 === "Voľno"){
                one_round[i].matchFinished = true
                one_round[i].matchStart = true
            } else {
                if(playingSetting === "teams"){
                    // vytvorenie ligových podzápasov pre teamy funkcia a naplnenie hráčov teamu, ktorí boli registrovaní pod svoj TEAM
                    one_round[i].underMatches = createUnderTeamLeague()
                    one_round[i].playersTeam1 = checkedTeams[i].teamPlayers
                    one_round[i].playersTeam2 = checkedTeams[(checkedTeams.length -1) - i].teamPlayers
                }
            }
                
            if (returnMatches) {
                revengeMatches.push({
                    matchStart: false,
                    matchFinished: false,
                    matchRegistered: false,
                    matchId: uuidv4(),
                    player1: checkedTeams[(checkedTeams.length -1) - i].player,
                    player1Id: checkedTeams[(checkedTeams.length -1) - i].playerId,
                    playersTeam1: false,
                    score1: 0,
                    player2: checkedTeams[i].player,
                    player2Id: checkedTeams[i].playerId, 
                    playersTeam2: false,
                    score2: 0,
                    underMatches: false,
                })
                if(revengeMatches[i].player1 === "Voľno" || revengeMatches[i].player2 === "Voľno") {
                    revengeMatches[i].matchFinished = true
                    revengeMatches[i].matchStart = true
                } else {
                    // vytvorenie ligových podzápasov pre teamy funkcia
                    revengeMatches[i].underMatches = createUnderTeamLeague()
                    revengeMatches[i].playersTeam1 = checkedTeams[(checkedTeams.length -1) - i].teamPlayers
                    revengeMatches[i].playersTeam2 = checkedTeams[i].teamPlayers
                }
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
let generateGeneralMatchDiv = (everyMatch, playingSystem) => {
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
            // Podmienka keď existujú nastavenia pre teamy
            if(everyMatch.underMatches === "active"){
                let allLeagueIndexes2 = getIndexesSelectedUnderMatch(leagueMatches, everyMatch.matchId)
                let legRound2 = allLeagueIndexes2[0]
                let matchRound2 = allLeagueIndexes2[1]
                let underMatchInRound2 = allLeagueIndexes2[2]
                let player1InUndermatch = leagueMatches[legRound2][matchRound2].underMatches[underMatchInRound2].player1
                let player2InUndermatch = leagueMatches[legRound2][matchRound2].underMatches[underMatchInRound2].player2
                let selectedEmptyMatchId = leagueMatches[legRound2][matchRound2].underMatches[underMatchInRound2].matchId
                
                
                if((player1InUndermatch === "Jednotlivec" || player2InUndermatch === "Jednotlivec") || (player1InUndermatch === "Dvojica" || player2InUndermatch === "Dvojica")){
                    // Funckia pre zmenu stavu aktívneho zápasu
                    firstModifyModalUndermatch(leagueMatches[legRound2][matchRound2], player1InUndermatch, player2InUndermatch, selectedEmptyMatchId) 
                }
            } else {
                if(playingSystem !== "teams"){
                    let leagueIndexes2 = getIndexSelectedMatch(leagueMatches, everyMatch.matchId)
                    // Funckia pre zmenu stavu aktívneho zápasu v prípade ak nie su nastavené teamy
                    modifyModal(leagueMatches[leagueIndexes2[0]][leagueIndexes2[1]])
                }
            }
            
        } else if (button.textContent === "Zapnúť") {
            generalMatchDiv.classList.add("activeLeagueMatch")
            button.textContent = "Upraviť"
            if(everyMatch.underMatches === "active"){
                // Funkcie pre získanie indexov kola, zápasu v kole a podzápasu
                let allLeagueIndexes = getIndexesSelectedUnderMatch(leagueMatches, everyMatch.matchId)
                // Vybraný podzápas v danom kole, prvý index kolo, druhý index zápas v kole, tretí index podzápas v hlavnom zápase a jeho nastavenie pre štart zápasu
                let legRound = allLeagueIndexes[0]
                let matchRound = allLeagueIndexes[1]
                let underMatchInRound = allLeagueIndexes[2]
                leagueMatches[legRound][matchRound].underMatches[underMatchInRound].matchStart = true
            } else {
                let leagueIndexes = getIndexSelectedMatch(leagueMatches, everyMatch.matchId)
                // Vybraný zápas v danom kole, prvý index kolo druhý zápas v kole a jeho nastavenie pre štart zápasu
                leagueMatches[leagueIndexes[0]][leagueIndexes[1]].matchStart = true
                // Srytie tlačidla 
                if(playingSystem === "teams" && (everyMatch.underMatches !== "oneUnderMatch" || everyMatch.underMatches !== "active")){
                    button.style.opacity = 0
                    // do funckie posielam - Vybraný zápas v danom kole, prvý index kolo druhý zápas v kole
                    showPowerOnButtonUndermatches(leagueMatches[leagueIndexes[0]][leagueIndexes[1]])
                }
            }
            saveLeagueMatches(leagueMatches)
            if(playingSystem === "teams"){printLeagueMatches()}
        }
    })

    if (everyMatch.matchStart) {
        generalMatchDiv.classList.add("activeLeagueMatch")
        button.textContent = "Upraviť"
        // Skrytie hlavného zápasu po jeho aktivovaní ale len pri teamoch
        if(playingSystem === "teams"){
            if(everyMatch.underMatches !== "active"){
                button.style.opacity = 0
                button.style.cursor = "default"
            }
            
        }
    } 
    if (everyMatch.matchFinished){
        generalMatchDiv.classList.remove("activeLeagueMatch")
        generalMatchDiv.classList.add("fisnishedLeagueMatch")
        button.textContent = "Ukončiť"
        generateHtmlPrintLeagueTable(leagueTable, leagueMatches)
    }

    // style nastavenia pre podzápasy v nastaveniach pre teams systém
    if (everyMatch.matchStart === false && everyMatch.underMatches === "oneUnderMatch"){
        button.style.opacity = 0
        button.style.cursor = "default"
        generalMatchDiv.style.backgroundColor = "#baaf57"
        generalMatchDiv.style.color = "#ffff"
        generalMatchDiv.style.width = "90%"
    } 
    if (everyMatch.underMatches === "active"){
        button.style.opacity = 1
        button.style.cursor = "pointer"
        generalMatchDiv.style.width = "90%"
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

// Funckia pre zapnutie vybraného zápasu a zmena matchStart na true a zmena pozadia aktívneho zápasu, dostanem index príslušného kola a index zápasu v danom kole
let getIndexSelectedMatch = (allMatches, matchID) => {
    let indexArray = []
    allMatches.forEach((oneRound, mainIndex) => {
        let index = oneRound.findIndex((oneMatchInRound) => {
            // console.log(oneMatchInRound)
            if (oneMatchInRound.matchId === matchID) {
                indexArray.push(mainIndex)
                return oneMatchInRound.matchId === matchID
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

// Funckia pre zapnutie vybraného podzápasu a zmena matchStart na true a zmena pozadia aktívneho podzápasu, dostanem index príslušného kola, index hlavného zápasu a index podzápasu v danom kole
let getIndexesSelectedUnderMatch = (allMatches, matchID) => {
    let indexesArray = []
    let underMatchesList
    allMatches.forEach((oneRound, roundIndex) => {
        oneRound.forEach((mainMatch, mainMatchIndex) => {
            if(mainMatch.underMatches !== false) {
                let underMatchesList = mainMatch.underMatches
                let underMatchIndex = underMatchesList.findIndex((oneUnderMatchInRound) => {
                    if (oneUnderMatchInRound.matchId === matchID) {
                        indexesArray.push(roundIndex)
                        indexesArray.push(mainMatchIndex)
                        return oneUnderMatchInRound.matchId === matchID
                    }
                })
                if (underMatchIndex > -1) {
                    indexesArray.push(underMatchIndex)
                }
            }
        })
    })

    if (indexesArray.length === 3){  
        return indexesArray  
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

// Funckia pre zobrazenie vybraného aktívneho zápasu zavolaním modal dialog window, kde sa načítajú hodnoty zo selectedMatch
// alebo vybraného podzápasu ak existuhú nastavenia pre teamy a po prvom stlační na modal boli vyvolení hráč z options z funckie firstModifyModalUndermatch()
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

// editácia a poslanie hodnôt z modal dialog window PODZÁPASOV a uloženie ich do leagueMatches a zatvorenie modal dialog window
document.querySelector("#selectForm").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()
    
    // currentEditedMatch[0] Globálna premenná kdde je preuložený aktuálny vybratý zápas
    // currentEditedMatch[1] Globálna premenná kdde je preuložený aktuálny ID prázdeho zápasu kde chcem doplniť hráčov
    let emptyMatchID = currentEditedMatch[1]
    let selectedFirst = event.target.playTeam1.value
    let selectedSecond = event.target.playTeam2.value

    // získanie objektu každého selektovaného hráča na základe ID
    let selectedPlayer1 = currentEditedMatch[0].playersTeam1.filter(function(onePlayer){
        let tryToFind = onePlayer.id.includes(selectedFirst)
        return tryToFind
    })
    let selectedPlayer2 = currentEditedMatch[0].playersTeam2.filter(function(onePlayer){
        let tryToFind = onePlayer.id.includes(selectedSecond)
        return tryToFind
    })

    console.log(selectedPlayer1)
    console.log(selectedPlayer2)

    
    // Zapísanie všetkých hodnôt - currentEditedMatch[0] je premenná kde je preuložený selectedMatch, teda aktuálny vybraný hlavný zápas z leagueMatches
    // Ale k vybratému podzápasu sa dostanem cez ID podzápasu, ktoré najdem v hlavnom zápase underMatches
    currentEditedMatch[0].underMatches.forEach((oneMatch) => {
        if (oneMatch.matchId === emptyMatchID) {
            oneMatch.player1 = selectedPlayer1[0].firstName + " " + selectedPlayer1[0].secondName
            oneMatch.player1Id = selectedPlayer1[0].id
            oneMatch.player2 = selectedPlayer2[0].firstName + " " + selectedPlayer2[0].secondName
            oneMatch.player2Id = selectedPlayer2[0].id
        }
    })
    // uloženie zmien v league LocalStorage
    saveLeagueMatches(leagueMatches)
    
    // Vykreslenie zmien na stránku z league LocalStorage
    printLeagueMatches()

    // Zatvorenie modálneho okna
    const modalChoosePlayer = document.querySelector("#modal-choose-players")
    modalChoosePlayer.close()

})

// Funckia pre zobrazenie vybraného zápasu aktívneho podzápasu zavolaním modal dialog window, kde si užívateľ navolí hráčov do podzápasov
let firstModifyModalUndermatch = (selectedMatch, currentPlayer1, currentPlayer2, emptyMatch) => {

    // uloženie do globálnej premennej aktuálny selectedMatch
    currentEditedMatch = [selectedMatch, emptyMatch]

    let team1 = [], team2 = []
    
    if(currentPlayer1 === "Jednotlivec" || currentPlayer2 === "Jednotlivec"){
        team1 = selectedMatch.playersTeam1
        team2 = selectedMatch.playersTeam2
    } else {
        let temporaryTeam1 = selectedMatch.playersTeam1
        let temporaryTeam2 = selectedMatch.playersTeam2

        temporaryTeam1.forEach((onePlayer, playerIndex1) => {
            temporaryTeam1.forEach((secondPlayer, playerIndex2) => {
                if(playerIndex2 > playerIndex1){
                    if(playerIndex1 !== playerIndex2){
                        team1.push([onePlayer, secondPlayer])
                    }
                }
            })
        })

        temporaryTeam2.forEach((onePlayer, playerIndex1) => {
            temporaryTeam2.forEach((secondPlayer, playerIndex2) => {
                if(playerIndex2 > playerIndex1){
                    if(playerIndex1 !== playerIndex2){
                        team2.push([onePlayer, secondPlayer])
                    }
                }
            })
        })
    }
    
    const modalChoosePlayer = document.querySelector("#modal-choose-players")
    const teamChoice1 = document.querySelector("#Team1")
    const teamChoice2 = document.querySelector("#Team2")

    teamChoice1.innerHTML = ""
    teamChoice2.innerHTML = ""


    team1.forEach((onePlayer, playerIndex) => {
        let optionPlayer1 = document.createElement("option")
        optionPlayer1.value = onePlayer.id
        if(currentPlayer1 === "Jednotlivec" || currentPlayer2 === "Jednotlivec"){
            optionPlayer1.innerHTML = `${onePlayer.firstName} ${onePlayer.secondName}`
        } else {
            optionPlayer1.innerHTML = `${onePlayer[0].firstName.charAt(0)}. ${onePlayer[0].secondName} /
            ${onePlayer[1].firstName.charAt(0)}. ${onePlayer[1].secondName}`
        }
        teamChoice1.appendChild(optionPlayer1)
    })

    team2.forEach((onePlayer, playerIndex) => {
        let optionPlayer2 = document.createElement("option")
        optionPlayer2.value = onePlayer.id
        if(currentPlayer1 === "Jednotlivec" || currentPlayer2 === "Jednotlivec"){
            optionPlayer2.innerHTML = `${onePlayer.firstName} ${onePlayer.secondName}`
        } else {
            optionPlayer2.innerHTML = `${onePlayer[0].firstName.charAt(0)}. ${onePlayer[0].secondName} /
            ${onePlayer[1].firstName.charAt(0)}. ${onePlayer[1].secondName}`
        }
        teamChoice2.appendChild(optionPlayer2)
    })

    modalChoosePlayer.showModal()

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
                let divGeneralMatch = generateGeneralMatchDiv(oneMatch, MainLeagueSettings[1])
                divLeagueRound.appendChild(divGeneralMatch)
                if(oneMatch.underMatches !== false){
                    // vytvorenie podzápasovej štruktúry
                    oneMatch.underMatches.forEach((oneUnderMatch) => {
                        let divUnderMatch = generateGeneralMatchDiv(oneUnderMatch, MainLeagueSettings[1])
                        divLeagueRound.appendChild(divUnderMatch)
                    })
                }
        
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


// Vytvorenie funkcie pre zobrazenie tlačidla ZAPNÚŤ pre každý podzápas po slačení tlačidla Zapnúť pre hlavný vybraný zápas nadzápas
// Každý podzápas sa nastaví na 'active' po stlačení v časti podzápas na ZAPNÚŤ
let showPowerOnButtonUndermatches = (selectedMainMatch) => {
    selectedMainMatch.underMatches.forEach((underMatch) => {
        underMatch.underMatches = "active"
    })
    // // uloženie zmien v league LocalStorage
    // saveLeagueMatches(leagueMatches)
}
