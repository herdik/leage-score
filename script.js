// *** called function to repeat and print name of league system
repeatingText()

// Array pre záskanie odvety a match setting(single, doubles teams)
let getMainLeagueSettings = []


// System league settings
document.querySelector("#league-settings").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()
    // Skrytie formulára po odoslaní nastavení
    document.querySelector(".system-container").classList.add("hide")
    
    // Variable odoslané do getMainLeagueSettings()
    let checkbox = event.target.checkbox.checked
    let settingsMatches = event.target.matchSettings.value

    // Array pre záskanie odvety a match setting(single, doubles teams) a jeho naplnenie
    getMainLeagueSettings.push(checkbox)
    getMainLeagueSettings.push(settingsMatches)

    // Default nastavenia pre checkbox a options in match-settings
    event.target.checkbox.checked = false
    event.target.matchSettings.selectedIndex = 0
    
    // // zavolanie Funckie pre získanie základných nastavní pre vytvorenie ligy
    // getMainLeagueSettings(checkbox, settingsMatches)
    
    
})


// Zavolanie funkcie kde sú aktuálny registrovaný hráči, v prípade že hráča nemám tak vytvorí prázdne pole
let registeredPlayersArray = getRegisteredPlayers()



// Zachytenie nového registrovaného hráča a uloženie ho do localStorage 
document.querySelector("#registration-form").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()

    // pridanie objektu do pola registrovaných hráčov
    registeredPlayersArray.push({
        id: uuidv4(),
        firstName: event.target.firstName.value,
        secondName: event.target.secondName.value,
        playersClub: event.target.playersClub.value,
        countryOption: event.target.countryOption.value 
    })

    // uloženie pola registeredPlayersArray a k nemu príslušného KEY do localStorage
    saveRegisteredPlayers(registeredPlayersArray)

    
    // generate HTML Structure for class="second-container hide" and ol class="registered-players-list"
    let oneHTML = generateHTMLstructure(registeredPlayersArray[registeredPlayersArray.length - 1])
    document.querySelector(".registered-players-list").appendChild(oneHTML)
    

    // vynulovanie všetkých values po odoslaní formulára
    event.target.firstName.value = ""
    event.target.secondName.value = ""
    event.target.playersClub.value = ""
    // nastavenie defaultne prvej option v Otions MENU(select id="countries" )
    event.target.countryOption.selectedIndex = 0
    
})

// called function pre vykreslenie hráčov do zoznamu po otvorení prehliadača/stránky
printRegPlayers()



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
    document.querySelector(".league-matches").classList.toggle("show-league-matches")
    document.querySelector(".leagueHeading .left-icon").classList.toggle("active-left")
    document.querySelector(".leagueHeading .right-icon").classList.toggle("active-right")

})

// Zavolanie funkcie kde sú aktuálny ligové zápasy, v prípade ak neexistujú, tak sa vytvorí prázdne pole
let leagueMatches = getLeagueMatches()

// Zavolanie funkcie kde je ligová tabuľka so všetkými hráčmi a výsledkami, v prípade ak neexistujú, tak sa vytvorí prázdne pole
let leagueTable = getLeagueTable()

// Tlačítko pre vytvorenie ligy a jeho následné skrytie
document.querySelector(".createLeague-container button").addEventListener("click", () => {

    leagueMatches = []
    leagueTable = []

    document.querySelector(".createLeague-container").classList.add("hide")

    // checkbox a match settings
    // checkbox
    if (getMainLeagueSettings[0] === undefined) {
        getMainLeagueSettings[0] = false
    }
     // match settings
    if (getMainLeagueSettings[1] === undefined) {
        getMainLeagueSettings[1] = "single"
    }

    // vytvorenie poľa hráčov (meno a priezvisko) z už zaregistrovaných hráčov
    let players = []
    registeredPlayersArray.forEach((onePlayer) => {
        players.push(onePlayer.firstName + " " + onePlayer.secondName)
        leagueTable.push({
            playerName: onePlayer.firstName + " " + onePlayer.secondName,
            playedMatches: 0, 
            wins: 0, 
            losses: 0, 
            difference: 0,
            points: 0
        })
    });

    // zavolanie funckie uloženie všetkých výsledkov ligových zápasov do localStorage - leagueTable
    saveLeagueTable(leagueTable)
    
    // vytvorenie ligových zápasov funckia
    // pole z registrovanými hráčmi (meno a priezvisko, checkbox pre odvety)
    create_league(players, getMainLeagueSettings[0])
    // console.log(create_league(players, getMainLeagueSettings[0]))
    
    saveLeagueMatches(leagueMatches)
    // localStorage.setItem("league", JSON.stringify(create_league(players, getMainLeagueSettings[0])))

    // zavolanie funkcie pre vykreslenie ligových zápasov do div .league-matches po otvorení prehliadača/stránky
    printLeagueMatches()

    // default settings pre getMainLeagueSettings
    getMainLeagueSettings = []
  
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
