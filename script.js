// *** called function to repeat and print name of league system
repeatingText()

// Array pre záskanie odvety a match setting(single, doubles teams)
let MainLeagueSettings = getLeagueSystemSettings()

// Zavolanie funkcie kde sú aktuálny registrovaný hráči, v prípade že hráča nemám tak vytvorí prázdne pole
let registeredPlayersArray = getRegisteredPlayers()

// Zavolanie funkcie kde sú aktuálny registrované teamy, v prípade že hráča nemám tak vytvorí prázdne pole
let registeredTeamsArray = getRegisteredTeams()


// System league settings
document.querySelector("#league-settings").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()
    // Skrytie formulára po odoslaní nastavení
    document.querySelector(".system-container").classList.add("hide")
    
    // Variable odoslané do MainLeagueSettings()
    let checkbox = event.target.checkbox.checked
    let settingsMatches = event.target.matchSettings.value

    // Array pre záskanie odvety a match setting(single, doubles teams) a jeho naplnenie
    MainLeagueSettings.push(checkbox)
    MainLeagueSettings.push(settingsMatches)
    
    // Uloženie League System Settings do Local Storage
    saveLeagueSystemSettings(MainLeagueSettings)
    // Default nastavenia pre checkbox a options in match-settings
    event.target.checkbox.checked = false
    event.target.matchSettings.selectedIndex = 0
    
    // Úprava registračného formulára pri nastaveniach pre dvojice a teamy
    if(settingsMatches === "doubles"){
        document.querySelector("#registration-form").innerHTML = `
            <input type="text" placeholder="Meno 1" name="firstName">
            <input type="text" placeholder="Priezvisko 1" name="secondName"><br>
            <input type="text" placeholder="Meno 2" name="firstName2">
            <input type="text" placeholder="Priezvisko 2" name="secondName2"><br>
            <input type="text" placeholder="Klub" name="playersClub">
            <input class="submit" type="submit" value="Zapísať" name="submitForm"><br>
            <!-- výber krajiny z options -->
                <select id="countries" name="countryOption">
                    <option value="svk">🇸🇰&emsp; Slovakia</option>
                    <option value="cz">🇨🇿&emsp; Czech republic</option>
                    <option value="pl">🇵🇱&emsp; Poland</option>
                </select>
            `
    } else if (settingsMatches === "teams"){
        let changeButton = document.createElement("button")
        changeButton.classList.add("changeBtn")
        changeButton.textContent = "Registrovať družstvo"
        document.querySelector("#registration-form").innerHTML = `
            <input type="text" placeholder="Meno" name="firstName">
            <input type="text" placeholder="Priezvisko" name="secondName"><br>
            <input type="text" placeholder="Klub" name="playersClub">
            <input class="submit" type="submit" value="Zapísať" name="submitForm"><br>

            <!-- výber krajiny z options -->
                <select id="countries" name="countryOption">
                    <option value="svk">🇸🇰&emsp; Slovakia</option>
                    <option value="cz">🇨🇿&emsp; Czech republic</option>
                    <option value="pl">🇵🇱&emsp; Poland</option>
                </select>
            `
        document.querySelector(".first-container").appendChild(changeButton)
        // Vymazanie placeholdera pre club po kliknutí na tlačítko Zmena družstva
        document.querySelector(".changeBtn").addEventListener("click", function(event){  
            // pridanie objektu hráča do pola registrovaných teamov
            let playersArray = []

            registeredPlayersArray.forEach((onePlayer) => {
                playersArray.push(onePlayer)
            })

            registeredTeamsArray.push({
                id: uuidv4(),
                teamPlayers: playersArray,
                teamName: registeredPlayersArray[0].playersClub
            })

            saveRegisteredTeams(registeredTeamsArray)

            // generate HTML Structure for class="second-container hide" and ol class="registered-players-list"
            let oneHTML = generateHTMLstructure(registeredTeamsArray[registeredTeamsArray.length - 1], MainLeagueSettings[1])
            document.querySelector(".registered-players-list").appendChild(oneHTML)

            document.querySelector("#registration-form").children.playersClub.value = "" 
            registeredPlayersArray = []
            saveRegisteredPlayers(registeredPlayersArray)
        })
        document.querySelector(".changeBtn").classList.add("hide")
    }
})


// Zachytenie nového registrovaného hráča a uloženie ho do localStorage 
document.querySelector("#registration-form").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()
    let playerFirstName = event.target.firstName.value
    let playerSecondName = event.target.secondName.value
    let playersClubName = event.target.playersClub.value

    if(MainLeagueSettings[1] === "doubles"){
        playerFirstName = event.target.firstName.value + " " + event.target.secondName.value
        playerSecondName = event.target.firstName2.value + " " + event.target.secondName2.value
        // vynulovanie všetkých values po odoslaní formulára
        event.target.firstName2.value = ""
        event.target.secondName2.value = ""
    }
    // pridanie objektu hráča do pola registrovaných hráčov
    let currentPlayer = {
        id: uuidv4(),
        firstName: playerFirstName,
        secondName: playerSecondName,
        playersClub: playersClubName,
        countryOption: event.target.countryOption.value 
    }
    registeredPlayersArray.push(currentPlayer)

    // uloženie pola registeredPlayersArray a k nemu príslušného KEY do localStorage
    saveRegisteredPlayers(registeredPlayersArray)

    if (MainLeagueSettings[1] !== "teams"){
        event.target.playersClub.value = ""
        // generate HTML Structure for class="second-container hide" and ol class="registered-players-list"
        let oneHTML = generateHTMLstructure(registeredPlayersArray[registeredPlayersArray.length - 1], MainLeagueSettings[1])
        document.querySelector(".registered-players-list").appendChild(oneHTML)
    }
    
    // vynulovanie všetkých values po odoslaní formulára
    event.target.firstName.value = ""
    event.target.secondName.value = ""
    
        
    // nastavenie defaultne prvej option v Otions MENU(select id="countries" )
    event.target.countryOption.selectedIndex = 0
    
})

// called function pre vykreslenie hráčov do zoznamu po otvorení prehliadača/stránky
if(localStorage.getItem("registeredTeams") !== null || localStorage.getItem("registeredPlayers") !== null){
    printRegPlayers(MainLeagueSettings[1])
}



document.querySelector(".second-container h1").addEventListener("click", () => {
    document.querySelector(".registered-players-list").classList.toggle("show-registered-player-list")
    document.querySelector(".second-container .left-icon").classList.toggle("active-left")
    document.querySelector(".second-container .right-icon").classList.toggle("active-right")

})

let changeRegForm = true
document.querySelector(".first-container h1").addEventListener("click", () => {
    if (changeRegForm) {
        document.querySelector("#registration-form").style.cssText = `
        max-height: 150px;
        overflow-y: auto;
        transition: max-height .5s ease-in, opacity .5s linear;
        opacity: 1;
        `
        if(MainLeagueSettings[1] === "doubles"){
            document.querySelector("#registration-form").style.maxHeight = "550px";
        }
        changeRegForm = false
    } else {
        document.querySelector("#registration-form").style.cssText = `
        max-height: 0px;
        overflow-y: hidden;
        transition: max-height .5s ease-out, opacity .5s linear;
        opacity: 0;
        `
        changeRegForm = true
    }
    document.querySelector(".first-container .left-icon").classList.toggle("active-left")
    document.querySelector(".first-container .right-icon").classList.toggle("active-right")
    if (MainLeagueSettings[1] === "teams"){
        document.querySelector(".changeBtn").classList.toggle("hide")
    }
    
})


let changeLeagueNameForm = true
document.querySelector(".heading-name-league").addEventListener("click", () => {
    if (changeLeagueNameForm) {
        document.querySelector(".heading-name-league").style.cssText =`
        transform: translateX(-200px)
        `
        document.querySelector("#leagueName-form").style.cssText = `
        opacity: 1
        `
        changeLeagueNameForm = false
    } else {
        document.querySelector(".heading-name-league").style.cssText =`
        transform: translateX(100px)
        `
        document.querySelector("#leagueName-form").style.cssText = `
        opacity: 0
        `
        changeLeagueNameForm = true
    }
    document.querySelector(".zero-container .left-icon").classList.toggle("active-left")
    document.querySelector(".zero-container .right-icon").classList.toggle("active-right")
    
})


document.querySelector(".leagueHeading h1").addEventListener("click", () => {
    document.querySelector(".leagueHeading .left-icon").classList.toggle("active-left")
    document.querySelector(".leagueHeading .right-icon").classList.toggle("active-right")
    if (leagueMatches.length > 1){
        document.querySelector(".league-matches").classList.toggle("show-league-matches")
    }
    

})

// Zavolanie funkcie kde sú aktuálny ligové zápasy, v prípade ak neexistujú, tak sa vytvorí prázdne pole
let leagueMatches = getLeagueMatches()

// Zavolanie funkcie kde je ligová tabuľka so všetkými hráčmi a výsledkami, v prípade ak neexistujú, tak sa vytvorí prázdne pole
let leagueTable = getLeagueTable()

// Tlačítko pre vytvorenie ligy a jeho následné skrytie
document.querySelector(".createLeague-container button").addEventListener("click", () => {

    leagueMatches = []
    leagueTable = []

    // Player Info
    let playerInfo

    document.querySelector(".createLeague-container").classList.add("hide")

    // checkbox a match settings
    // checkbox
    if (MainLeagueSettings[0] === undefined) {
        MainLeagueSettings[0] = false
    }
     // match settings undefined
    if (MainLeagueSettings[1] === undefined) {
        MainLeagueSettings[1] = "single"
    }

    // vytvorenie poľa hráčov (meno a priezvisko) z už zaregistrovaných hráčov
    let players = []
    registeredPlayersArray.forEach((onePlayer) => {
        // match settings defined
        if (MainLeagueSettings[1] === "single") {
            playerInfo = onePlayer.firstName + " " + onePlayer.secondName
        } else if (MainLeagueSettings[1] === "doubles"){
            playerInfo = onePlayer.firstName + " - " + onePlayer.secondName
        }
        players.push({
            player: playerInfo,
            playerId: onePlayer.id,
        })
        leagueTable.push({
            playerName: playerInfo,
            playerId: onePlayer.id, 
            playedMatches: 0, 
            wins: 0, 
            losses: 0, 
            difference: 0,
            points: 0
        })
    });
    // Pridanie voľno do poľa pri nepárnom počte hráčov, teda aby každý hráč mal zápas v danom kole
    if (players.length % 2 != 0){
        players.push({
            player: "Voľno",
            playerId: 0,
        })
    }

    // zavolanie funckie uloženie všetkých výsledkov ligových zápasov do localStorage - leagueTable
    saveLeagueTable(leagueTable)
    
    // vytvorenie ligových zápasov funckia
    // pole z registrovanými hráčmi (meno a priezvisko, checkbox pre odvety)
    create_league(players, MainLeagueSettings[0])
    
    saveLeagueMatches(leagueMatches)
    

    // zavolanie funkcie pre vykreslenie ligových zápasov do div .league-matches po otvorení prehliadača/stránky
    printLeagueMatches()

    // zavolanie funkcie pre vykreslenie tabuľky výsledkov ligových zápasov do div .result-container +  results-table po otvorení prehliadača/stránky
    generateHtmlPrintLeagueTable(leagueTable, leagueMatches)    

    // zavolanie funkcie pre vykreslenie tabuľky výsledkov ligových zápasov do div .result-container +  results-table po otvorení prehliadača/stránky
    // generateHtmlPrintLeagueTable()
  
})


// Skrytie a odokrytie tabuľky výsledkov
document.querySelector(".result-container h1").addEventListener("click", () => {
    document.querySelector(".result-container .left-icon").classList.toggle("active-left")
    document.querySelector(".result-container .right-icon").classList.toggle("active-right")
    if (leagueTable.length > 0){
        document.querySelector(".hide-table-results").classList.toggle("show-table-results")
    }
    

})

// Skrytie tlačítka "Vytvoriť ligu" pri vytvorení ligy + skrytie formulára s nastaveniami o vytvorení ligy

// // if (document.querySelector(".league-matches").children.length){
// if (leagueMatches.length){
//     // Skrytie tlačítka "Vytvoriť ligu"
//     document.querySelector(".createLeague-container").classList.add("hide")
//     // Skrytie formulára po odoslaní nastavení ak je liga vytvorená
//     document.querySelector(".system-container").classList.add("hide")
// }


// === Printing league name to web site ===
if (getLeagueName().length <= 0){
    document.querySelector(".leagueHeading").classList.add("hide")
} else {
    document.querySelector(".leagueHeading").classList.remove("hide")
    document.querySelector(".leagueHeading h1").innerHTML = `
    ${getLeagueName()}
    <span class="left-icon"></span>
    <span class="right-icon"></span>
    `
}


// zavolanie funkcie pre vykreslenie ligových zápasov do div .league-matches po otvorení prehliadača/stránky
printLeagueMatches()

// zavolanie funkcie pre vykreslenie tabuľky výsledkov ligových zápasov do div .result-container +  results-table po otvorení prehliadača/stránky
generateHtmlPrintLeagueTable(leagueTable, leagueMatches)
