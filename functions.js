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

// Save league Name to Local Storage
let saveLeagueNameLocalStorage = (nameOfLeague) => {
    localStorage.setItem("headingLeague", JSON.stringify(nameOfLeague))
}

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

let generateHTMLstructure = (newRegPlayer) => {
    
    if (registeredPlayersArray.length > 0) {
        // Ak existuje aspoň jeden hráč odober display none
        document.querySelector(".second-container").classList.remove("hide")

    }

    // vytvorenie delete button pre vymazanie hráča z second-container - "Zoznam hráčov"
    let removeBtnPlayer = document.createElement("button")
    removeBtnPlayer.classList.add("removeBtn")
    removeBtnPlayer.innerHTML = "Vymazať<br>hráča"

    let newLi = document.createElement("li")
    newLi.innerHTML = `
            <img src="img/slovakia-flag.png" alt="slovakia-flag">
            <div class="player-informations">
                <h3>${newRegPlayer.firstName} ${newRegPlayer.secondName}</h3>
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

        let oneHTML = generateHTMLstructure(onePlayer)

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



// vytvorenie ligových zápasov funkcia
let create_league = function(checkedTeams, revengeMatch) {

    // Pridanie voľno do poľa pri nepárnom počte hráčov, teda aby každý hráč mal zápas v danom kole
    if (checkedTeams.length % 2 != 0){
        checkedTeams.push("Voľno")
    }

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
                matchId: uuidv4(),
                player1: checkedTeams[i], 
                score1: 0,
                player2 :checkedTeams[(checkedTeams.length -1) - i],
                score2: 0,
            })
            if (returnMatches) {
                revengeMatches.push({
                    matchStart: false,
                    matchFinished: false,
                    matchId: uuidv4(),
                    player1: checkedTeams[(checkedTeams.length -1) - i],
                    score1: 0,
                    player2 : checkedTeams[i], 
                    score2: 0,
                })
            }
            // console.log(checkedTeams[i])
            // console.log(checkedTeams[(checkedTeams.length -1) - i])
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

    const modalWindow = document.querySelector("#modal")

    // Ako náhle vytvorím nový div tak bude hned naň naviazaný addeventlistener, ktorý má v sebe funkciu na vymazanie

    button.addEventListener("click", function(event){ 
        if (button.textContent === "Upraviť"){
            document.querySelector(".pl1-span").textContent = "ˇžofre"
            modalWindow.showModal()
            
            document.querySelector("#matchForm").addEventListener("submit", (event) => {
                // vypnutie update/refresh formulára po odoslaní
                event.preventDefault()

                console.log(event)
                let checkbox = event.target.checkFinish.checked
                let score1 = event.target.score1.value
                console.log(checkbox)
                console.log(score1)
                modalWindow.close()
                event.target.checkFinish.checked = false
                event.target.score1.value = 0

            })
            // generalMatchDiv.classList.remove("activeLeagueMatch")
            // button.textContent = "Zapnúť"
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
