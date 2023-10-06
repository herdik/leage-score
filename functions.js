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
            <img src="img/flags/${newRegPlayer.countryOption}.png" alt="">
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
    for (let round = 0; round < 9; round++) {
        playerInMatch = round % 2 === 0 || round > 5 ? "Jednotlivec" : "Dvojica"
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


// vytvorenie všetkých možných unikátnych dvojíc pre options menu v Modal window pre dvojice možnosť
let createUniqDoubles = (allTeamPlayers) => {
    let uniqDoubles = []

    allTeamPlayers.forEach((onePlayer, playerIndex1) => {
        allTeamPlayers.forEach((secondPlayer, playerIndex2) => {
            if(playerIndex2 > playerIndex1){
                if(playerIndex1 !== playerIndex2){
                    uniqDoubles.push([onePlayer, secondPlayer])
                }
            }
        })
    })

    return uniqDoubles
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
                optionsSingles1: false,
                optionsDoubles1: false,
                score1: 0,
                player2: checkedTeams[(checkedTeams.length -1) - i].player,
                player2Id: checkedTeams[(checkedTeams.length -1) - i].playerId,
                playersTeam2: false,
                optionsSingles2: false,
                optionsDoubles2: false,
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
                    one_round[i].optionsSingles1 = one_round[i].playersTeam1.slice()
                    one_round[i].optionsSingles2 = one_round[i].playersTeam2.slice() 
                    one_round[i].optionsDoubles1 = createUniqDoubles(one_round[i].playersTeam1)
                    one_round[i].optionsDoubles2 = createUniqDoubles(one_round[i].playersTeam2)
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
                    revengeMatches[i].optionsSingles1 = revengeMatches[i].playersTeam1.slice()
                    revengeMatches[i].optionsSingles2 = revengeMatches[i].playersTeam2.slice()
                    revengeMatches[i].optionsDoubles1 = createUniqDoubles(revengeMatches[i].playersTeam1)
                    revengeMatches[i].optionsDoubles2 = createUniqDoubles(revengeMatches[i].playersTeam2)
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
                    
                    

                } else {
                    // Funckia pre zmenu stavu aktívneho zápasu v prípade ak sú už vybraný hráči do podzápasu
                    let selectedMatchMain = leagueMatches[legRound2][matchRound2]
                    let selectedUndermatch = leagueMatches[legRound2][matchRound2].underMatches[underMatchInRound2]
                    
                    modifyModal(selectedUndermatch, selectedMatchMain)
                
                    // let extesionUndermatches = leagueMatches[legRound2][matchRound2].underMatches
                    // let scoreFirstTeam = leagueMatches[legRound2][matchRound2].score1
                    // let scoreSecondTeam = leagueMatches[legRound2][matchRound2].score2


                    // if ((scoreFirstTeam === 3 && scoreSecondTeam === 3) && (extesionUndermatches[6].matchStart != true && extesionUndermatches[7].matchStart != true && extesionUndermatches[8].matchStart != true )){
                    //     leagueMatches[legRound2][matchRound2].optionsSingles1 = leagueMatches[legRound2][matchRound2].playersTeam1.slice()
                    //     leagueMatches[legRound2][matchRound2].optionsSingles2 = leagueMatches[legRound2][matchRound2].playersTeam2.slice()
                    // }
                    
                }
            } else {
                if(playingSystem !== "teams"){
                    let leagueIndexes2 = getIndexSelectedMatch(leagueMatches, everyMatch.matchId)
                    // Funckia pre zmenu stavu aktívneho zápasu v prípade ak nie su nastavené teamy
                    modifyModal(leagueMatches[leagueIndexes2[0]][leagueIndexes2[1]], false)
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
                    // do funckie posielam - Vybraný zápas v danom kole, prvý index kolo druhý index je zápas v kole
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
    
    // currentEditedMatch[0] je premenná kde je preuložený selectedMatch, teda aktuálny vybraný zápas z leagueMatches
    currentEditedMatch[0].score1 = playerScore1
    currentEditedMatch[0].score2 = playerScore2
    if (checkbox) {
        currentEditedMatch[0].matchFinished = checkbox
        currentEditedMatch[0].matchStart = false
    }

    // pripočítať skóre bod do hlavného zápasu po ukončení podzápasu platí pre setting Teams
    if (currentEditedMatch[0].underMatches === "active" && checkbox){
        let undermatchesInMainMatch = []
        playerScore1 > playerScore2 ? currentEditedMatch[1].score1 += 1 : currentEditedMatch[1].score2 += 1
        currentEditedMatch[1].underMatches.forEach((underMatch) => {
            if(underMatch.matchFinished){
                undermatchesInMainMatch.push(underMatch.matchFinished)
            }
        })
        // ukončenie hlavného nadzápasu ak je stav po odohratí 6 podzápasov nie je remíza a keď remíza je ale víťaž bude po ukončení 9 podzápasov
        if((undermatchesInMainMatch.length === 6) && (currentEditedMatch[1].score1 != 3 && currentEditedMatch[1].score2 != 3)){
            currentEditedMatch[1].matchFinished = true
            currentEditedMatch[1].matchStart = false
        } else if (undermatchesInMainMatch.length === 9) {
            currentEditedMatch[1].matchFinished = true
            currentEditedMatch[1].matchStart = false
        }

        // znovunaplnenie optionsSingle teda možnosti pre výber sigle hráča v prípade ak je stav zápasu 3:3 po ukončení základných podzápasov
        // currentEditedMatch[1] reprezentuje hlavný zápas
        let extesionUndermatches = currentEditedMatch[1].underMatches
        console.log(currentEditedMatch[1].score1)
        console.log(currentEditedMatch[1].score2)
        console.log(extesionUndermatches)
        

        if ((currentEditedMatch[1].score1 === 3 && currentEditedMatch[1].score2 === 3) && (extesionUndermatches[6].matchStart != true && extesionUndermatches[7].matchStart != true && extesionUndermatches[8].matchStart != true )){
            currentEditedMatch[1].optionsSingles1 = currentEditedMatch[1].playersTeam1.slice()
            currentEditedMatch[1].optionsSingles2 = currentEditedMatch[1].playersTeam2.slice()
        }

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
let modifyModal = (selectedMatch, mainSelectedMatch) => {
    // uloženie do globálnej premennej aktuálny selectedMatch
    currentEditedMatch = [selectedMatch, mainSelectedMatch]

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

    // id ozančené užívateľom pre každý team pre 
    let selectedFirstId = event.target.playTeam1.value
    let selectedSecondId = event.target.playTeam2.value

    // vytvorenie pole Ids v prípade že pole obsahuje "/" teda ak posielam dvojicu ak je hráč samotný vznikne pole o jednom hráčovi
    const team1DoubleId = selectedFirstId.split("/")
    const team2DoubleId = selectedSecondId.split("/")

    // získanie objektu každého selektovaného hráča na základe ID
    let selectedPlayer1 = currentEditedMatch[0].playersTeam1.filter(function(onePlayer){
        let tryToFind1 = onePlayer.id.includes(team1DoubleId[0])
        let tryToFind2 = onePlayer.id.includes(team1DoubleId[1])
        if (team1DoubleId.length < 2) {
            return tryToFind1
        } else {
            return tryToFind1 || tryToFind2
        }    
    })
    let selectedPlayer2 = currentEditedMatch[0].playersTeam2.filter(function(onePlayer){
        let tryToFind1 = onePlayer.id.includes(team2DoubleId[0])
        let tryToFind2 = onePlayer.id.includes(team2DoubleId[1])
        if (team2DoubleId.length < 2) {
            return tryToFind1
        } else {
            return tryToFind1 || tryToFind2
        }
    })

    // Zapísanie všetkých hodnôt - currentEditedMatch[0] je premenná kde je preuložený selectedMatch, teda aktuálny vybraný hlavný zápas z leagueMatches
    // Ale k vybratému podzápasu sa dostanem cez ID podzápasu, ktoré najdem v hlavnom zápase underMatches
    currentEditedMatch[0].underMatches.forEach((oneMatch) => {
        if (oneMatch.matchId === emptyMatchID) {
            oneMatch.player1 = team1DoubleId.length < 2 ? selectedPlayer1[0].firstName + " " + selectedPlayer1[0].secondName : selectedPlayer1[0].firstName + " " + selectedPlayer1[0].secondName + " - " + selectedPlayer1[1].firstName + " " + selectedPlayer1[1].secondName
            oneMatch.player1Id = team1DoubleId.length < 2 ? selectedPlayer1[0].id : [selectedPlayer1[0].id, selectedPlayer1[1].id]
            oneMatch.player2 = team2DoubleId.length < 2 ? selectedPlayer2[0].firstName + " " + selectedPlayer2[0].secondName : selectedPlayer2[0].firstName + " " + selectedPlayer2[0].secondName + " - " + selectedPlayer2[1].firstName + " " + selectedPlayer2[1].secondName
            oneMatch.player2Id = team2DoubleId.length < 2 ? selectedPlayer2[0].id : [selectedPlayer2[0].id, selectedPlayer2[1].id]
        }
    })

    // Vymazanie vybraných hráčov / dvojíc z optionssingles a optionsdoubles
    
    if (team1DoubleId.length < 2 && team2DoubleId.length < 2) {
        let indexOptionSingle = getIndexSelectedOption(currentEditedMatch[0].optionsSingles1, team1DoubleId)
        currentEditedMatch[0].optionsSingles1.splice(indexOptionSingle, 1)
        indexOptionSingle = getIndexSelectedOption(currentEditedMatch[0].optionsSingles2, team2DoubleId)
        currentEditedMatch[0].optionsSingles2.splice(indexOptionSingle, 1)

        // let indexOptionSingle = currentEditedMatch[0].optionsSingles1.findIndex(function(onePlayer){
        //     return onePlayer.id.includes(team1DoubleId[0])  
        // })
        // currentEditedMatch[0].optionsSingles1.slice(indexOptionSingle, 1)
    } else {
        let indexOptionDouble = getIndexSelectedOption(currentEditedMatch[0].optionsDoubles1, team1DoubleId)
        currentEditedMatch[0].optionsDoubles1.splice(indexOptionDouble, 1)
        indexOptionDouble = getIndexSelectedOption(currentEditedMatch[0].optionsDoubles2, team2DoubleId)
        currentEditedMatch[0].optionsDoubles2.splice(indexOptionDouble, 1)

        // let indexOptionDouble = currentEditedMatch[0].optionsDoubles1.findIndex((oneDoubles) => {
        //     return oneDoubles[0].id.includes(team1DoubleId[0]) && oneDoubles[1].id.includes(team1DoubleId[1])
        // })
        // currentEditedMatch[0].optionsDoubles1.slice(indexOptionDouble, 1)
    }
    
    // uloženie zmien v league LocalStorage
    saveLeagueMatches(leagueMatches)
    
    // Vykreslenie zmien na stránku z league LocalStorage
    printLeagueMatches()

    // Zatvorenie modálneho okna
    const modalChoosePlayer = document.querySelector("#modal-choose-players")
    modalChoosePlayer.close()

})

// získanie indexu vybranej option zo select, pre podzápasy v jednotlicvoch a v dvojiciach
let getIndexSelectedOption = (selectOption, singleOrDoubleId) => {
    let selectedIndex = selectOption.findIndex(function(playerTocheck){
        if(singleOrDoubleId.length < 2){
            return playerTocheck.id.includes(singleOrDoubleId[0])
        } else {
            return playerTocheck[0].id.includes(singleOrDoubleId[0]) && playerTocheck[1].id.includes(singleOrDoubleId[1])
        }
        
    })
    return selectedIndex 
} 

// Funckia pre zobrazenie vybraného zápasu aktívneho podzápasu zavolaním modal dialog window, kde si užívateľ navolí hráčov do podzápasov
let firstModifyModalUndermatch = (selectedMatch, currentPlayer1, currentPlayer2, emptyMatch) => {

    // uloženie do globálnej premennej aktuálny selectedMatch - hlavný zápas, emptyMatch kliknutý aktuálny prázdny podzápas pre zápísanie údajov
    currentEditedMatch = [selectedMatch, emptyMatch]

    let team1 = [], team2 = []
    
    if(currentPlayer1 === "Jednotlivec" || currentPlayer2 === "Jednotlivec"){
        team1 = selectedMatch.optionsSingles1
        team2 = selectedMatch.optionsSingles2
    } else {
        team1 = selectedMatch.optionsDoubles1
        team2 = selectedMatch.optionsDoubles2
    }
    
    const modalChoosePlayer = document.querySelector("#modal-choose-players")
    const teamChoice1 = document.querySelector("#Team1")
    const teamChoice2 = document.querySelector("#Team2")

    teamChoice1.innerHTML = ""
    teamChoice2.innerHTML = ""


    team1.forEach((onePlayer, playerIndex) => {
        let optionPlayer1 = document.createElement("option")
        if(currentPlayer1 === "Jednotlivec" || currentPlayer2 === "Jednotlivec"){
            optionPlayer1.value = onePlayer.id
            optionPlayer1.innerHTML = `${onePlayer.firstName} ${onePlayer.secondName}`
        } else {
            optionPlayer1.value = onePlayer[0].id + "/" + onePlayer[1].id
            optionPlayer1.innerHTML = `${onePlayer[0].firstName.charAt(0)}. ${onePlayer[0].secondName} /
            ${onePlayer[1].firstName.charAt(0)}. ${onePlayer[1].secondName}`
        }
        teamChoice1.appendChild(optionPlayer1)
    })

    team2.forEach((onePlayer, playerIndex) => {
        let optionPlayer2 = document.createElement("option")
        if(currentPlayer1 === "Jednotlivec" || currentPlayer2 === "Jednotlivec"){
            optionPlayer2.value = onePlayer.id
            optionPlayer2.innerHTML = `${onePlayer.firstName} ${onePlayer.secondName}`
        } else {
            optionPlayer2.value = onePlayer[0].id + "/" + onePlayer[1].id
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
                    oneMatch.underMatches.forEach((oneUnderMatch, index) => {
                        let divUnderMatch = generateGeneralMatchDiv(oneUnderMatch, MainLeagueSettings[1])
                        // zobrazenie a skrytie podzápasov v prípade ak je stav po základných podzápasoch remíza
                        // rozhodujúce podzápasy sú od indexu 6
                        if(oneMatch.score1 >= 3 && oneMatch.score2 >= 3){
                            divUnderMatch.classList.remove("hide")
                        } else{
                            if(index > 5){divUnderMatch.classList.add("hide")}
                        }
                        
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
