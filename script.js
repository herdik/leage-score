// *** called function to repeat and print name of league system
repeatingText()

// Array pre záskanie odvety a match setting(single, doubles teams)
let MainLeagueSettings = getLeagueSystemSettings()

// Zavolanie funkcie kde sú aktuálny registrovaný hráči, v prípade že hráča nemám tak vytvorí prázdne pole
let registeredPlayersArray = getRegisteredPlayers()

// Zavolanie funkcie kde sú aktuálny registrované teamy, v prípade že hráča nemám tak vytvorí prázdne pole
let registeredTeamsArray = getRegisteredTeams()

// Zavolanie funkcie kde sú registrované všetky dostupné stolyy, v prípade že nemám ani jeden stôl tak vytvorí prázdne pole
let registeredTables = getNumberOfTables()

// Zavolanie funkcie kde je názov ligy , v prípade že nie je zadaný názov ligy tak vytvorí prázdne pole
let nameOfLeague = getLeagueName()

// Zavolanie funkcie kde sú aktuálny ligové zápasy, v prípade ak neexistujú, tak sa vytvorí prázdne pole
let leagueMatches = getLeagueMatches()

// Zavolanie funkcie kde je ligová tabuľka so všetkými hráčmi a výsledkami, v prípade ak neexistujú, tak sa vytvorí prázdne pole
let leagueTable = getLeagueTable()

// ================created registraton button for comleted registrated team -valid only for teams
let changeButton = document.createElement("button")
changeButton.classList.add("changeBtn")
document.querySelector(".first-container").appendChild(changeButton)
changeButton.classList.add("hide")
changeButton.textContent = "Registrovať družstvo"
// ==============================================


// show or correct registration information for doubles and teams
if(MainLeagueSettings[1] === "doubles"){
    document.querySelector(".playerInfos").innerHTML = `
        <input type="text" placeholder="Meno 1" name="firstName">
        <input type="text" placeholder="Priezvisko 1" name="secondName"><br>
        <input type="text" placeholder="Meno 2" name="firstName2">
        <input type="text" placeholder="Priezvisko 2" name="secondName2"><br>
        <input type="text" placeholder="Klub" name="playersClub">
        <input class="submit" type="submit" value="Zapísať" name="submitForm"><br>
        `
} else if (MainLeagueSettings[1] === "teams"){
    
    document.querySelector(".playerInfos").innerHTML = `
        <input type="text" placeholder="Meno" name="firstName">
        <input type="text" placeholder="Priezvisko" name="secondName"><br>
        <input type="text" placeholder="Klub" name="playersClub">
        <input class="submit" type="submit" value="Zapísať" name="submitForm"><br>
        `
    
    changeButton.classList.add("hide")
}

// Show box to set leaguename and window to set leaguesettings if they EXISTS in localStorage - remove hide class
let showBasicSettings = checkExistLeagueAndHeadingLeague(nameOfLeague, MainLeagueSettings)
if (showBasicSettings){
    // odobratie classy hide pre zadávanie názvu ligy a nastavenia ligy
    document.querySelector(".zero-container").classList.add("hide")
    document.querySelector(".system-container").classList.add("hide")
} 

// show league a league table if exists in localStorage and hide button create league
let showLeagueAndTable = checkExistMainLeague(leagueMatches)
if (showLeagueAndTable){
    document.querySelector(".leagueHeading").classList.remove("hide")
    document.querySelector(".league-matches").classList.remove("hide")
    document.querySelector(".result-container").classList.remove("hide")
    document.querySelector(".createLeague-container").classList.add("hide")
    document.querySelector(".first-container").classList.add("hide")
    document.querySelector(".leagueHeading h1").innerHTML = `
    ${nameOfLeague}
    <span class="left-icon"></span>
    <span class="right-icon"></span>
    `
} else {
    document.querySelector(".leagueHeading").classList.add("hide")
    document.querySelector(".league-matches").classList.add("hide")
    document.querySelector(".result-container").classList.add("hide")
    document.querySelector(".createLeague-container").classList.remove("hide")
    document.querySelector(".first-container").classList.remove("hide")
}


// name of the league  save to LocalStorage
document.querySelector("#leagueName-form").addEventListener("submit", (event) => {
    event.preventDefault()
    nameOfLeague = event.target.leagueName.value

    document.querySelector(".leagueHeading h1").innerHTML = `
    ${nameOfLeague}
    <span class="left-icon"></span>
    <span class="right-icon"></span>
    `

    saveLeagueNameLocalStorage(nameOfLeague)

    event.target.leagueName.value = ""
    
    
    
})


// System league settings
document.querySelector("#league-settings").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()
    MainLeagueSettings = []
    // Skrytie formulára po odoslaní nastavení
    document.querySelector(".system-container").classList.add("hide")
    
    // Variable odoslané do MainLeagueSettings()
    let checkbox = event.target.checkbox.checked
    let settingsMatches = event.target.matchSettings.value
    let raceToPlay = event.target.raceTo.value
    let choosedGameNumber = event.target.querySelector(".default img").alt
    let numberOfTables = event.target.countTables.value

    // Array pre záskanie odvety a match setting(single, doubles teams) a jeho naplnenie
    MainLeagueSettings.push(checkbox)
    MainLeagueSettings.push(settingsMatches)
    MainLeagueSettings.push(raceToPlay)
    MainLeagueSettings.push(choosedGameNumber)
    MainLeagueSettings.push(numberOfTables)
    
    // Uloženie League System Settings do Local Storage
    saveLeagueSystemSettings(MainLeagueSettings)
    // Default nastavenia pre checkbox a options in match-settings
    event.target.checkbox.checked = false
    event.target.matchSettings.selectedIndex = 0
    event.target.raceTo.value = "1"
    event.target.querySelector(".default img").src = "img/eight-ball.png"
    event.target.querySelector(".default img").alt = "eight-ball"
    event.target.countTables.value = "1"

    // naplnenie stolov do zoznamu registrovaných stolov pre možnosť hrania
    registeredTables = []
    for(let oneTable=1; oneTable <= MainLeagueSettings[4]; oneTable++){
        registeredTables.push(oneTable)
    }
    // uloženie všetkých stolov do localStorage
    saveNumberOfTables(registeredTables)

    
    // Úprava registračného formulára pri nastaveniach pre dvojice a teamy
    if(settingsMatches === "doubles"){
        document.querySelector(".playerInfos").innerHTML = `
            <input type="text" placeholder="Meno 1" name="firstName">
            <input type="text" placeholder="Priezvisko 1" name="secondName"><br>
            <input type="text" placeholder="Meno 2" name="firstName2">
            <input type="text" placeholder="Priezvisko 2" name="secondName2"><br>
            <input type="text" placeholder="Klub" name="playersClub">
            <input class="submit" type="submit" value="Zapísať" name="submitForm"><br>
            `
    } else if (settingsMatches === "teams"){
        // let changeButton = document.createElement("button")
        // changeButton.classList.add("changeBtn")
        // changeButton.textContent = "Registrovať družstvo"
        document.querySelector(".playerInfos").innerHTML = `
            <input type="text" placeholder="Meno" name="firstName">
            <input type="text" placeholder="Priezvisko" name="secondName"><br>
            <input type="text" placeholder="Klub" name="playersClub">
            <input class="submit" type="submit" value="Zapísať" name="submitForm"><br>
            `
        // document.querySelector(".first-container").appendChild(changeButton)
        
        document.querySelector(".changeBtn").classList.add("hide")
    }

    // skrytie políčka pre zadávanie názvu ligy a skrytie nastavenia ligy
    document.querySelector(".zero-container").classList.add("hide")
    document.querySelector(".system-container").classList.add("hide")
})


// ====System for TEAMS registration all team click button registrovať družstvo====
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
        teamName: registeredPlayersArray[0].playersClub,
        countryOption: playersArray[1].countryOption
    })

    saveRegisteredTeams(registeredTeamsArray)
    
     
    // generate HTML Structure for class="second-container hide" and ol class="registered-players-list"
    let oneHTML = generateHTMLstructure(registeredTeamsArray[registeredTeamsArray.length - 1], MainLeagueSettings[1])
    document.querySelector(".registered-players-list").appendChild(oneHTML)

    // Vymazanie klubu po stlační tlačítka registrovať družstvo a nastavenie defaultnej krajiny v Options MENU
    // console.log(document.querySelector("#registration-form").children)
    document.querySelector("#registration-form").playersClub.value = ""
    // nastavenie defaultne prvej option v Options MENU(select id="countries" )
    document.querySelector(".selected-country img").src = "img/flags/Slovensko.png"
    document.querySelector(".selected-country img").alt = "Slovensko"
    document.querySelector(".selected-countryName").textContent = "Slovensko"
    
    registeredPlayersArray = []
    saveRegisteredPlayers(registeredPlayersArray)
})


// skrytie optionlist pre výber typu hry a otáčanie zobáčika
document.querySelector(".defaultOption").addEventListener("click", () => {
    document.querySelector(".game-option-list").classList.toggle("activeIcon")
    document.querySelector(".chooseGame").classList.toggle("show-gameOptions")

})

// Zachytenie výberu typu hry z Options list game-menu -  game-option-list
document.querySelector(".chooseGame").addEventListener("click", (e) => {
    const newSelectedOption = e.target
    const newSelectedOption2 = e.target.firstChild
    const newSelectionsList = [newSelectedOption, newSelectedOption2]

    let correctBallImg = newSelectionsList.filter(function(oneBall){
        let findBall = isImage(oneBall)
        return findBall
    })
    document.querySelector(".default img").src = correctBallImg[0].src
    document.querySelector(".default img").alt = correctBallImg[0].alt
    document.querySelector(".chooseGame").classList.toggle("show-gameOptions")
    document.querySelector(".game-option-list").classList.toggle("activeIcon")
})


// Skrytie výberu typu hry pre Teams - teamy
document.querySelector("#match-settings").addEventListener("change", function(event){
    let selectedOpt = event.target.value
    if(selectedOpt === "teams"){
        document.querySelector(".game-menu").classList.add("hide")
    } else{
        document.querySelector(".game-menu").classList.remove("hide")
    }
    
})



// Zachytenie nového registrovaného hráča a uloženie ho do localStorage 
document.querySelector("#registration-form").addEventListener("submit", (event) => {
    // vypnutie update/refresh formulára po odoslaní
    event.preventDefault()
    let playerFirstName = event.target.firstName.value
    let playerSecondName = event.target.secondName.value
    let playersClubName = event.target.playersClub.value
    let selectedCountry = event.target.querySelector(".selected-countryName").textContent

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
        countryOption: selectedCountry
    }
    registeredPlayersArray.push(currentPlayer)

    // uloženie pola registeredPlayersArray a k nemu príslušného KEY do localStorage
    saveRegisteredPlayers(registeredPlayersArray)

    if (MainLeagueSettings[1] !== "teams"){
        event.target.playersClub.value = ""
        // generate HTML Structure for class="second-container hide" and ol class="registered-players-list"
        let oneHTML = generateHTMLstructure(registeredPlayersArray[registeredPlayersArray.length - 1], MainLeagueSettings[1])
        document.querySelector(".registered-players-list").appendChild(oneHTML)

        // nastavenie defaultne prvej option v Otions MENU(select id="countries" )
        event.target.querySelector(".selected-country img").src = "img/flags/Slovensko.png"
        event.target.querySelector(".selected-country img").alt = "Slovensko"
        event.target.querySelector(".selected-countryName").textContent = "Slovensko"
    }
    
    // vynulovanie všetkých values po odoslaní formulára
    event.target.firstName.value = ""
    event.target.secondName.value = ""
    
        
    
    
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

// zobrazenie a skrytie registračného listu
let changeRegForm = true
document.querySelector(".first-container h1").addEventListener("click", () => {
    if (changeRegForm) {
        document.querySelector("#registration-form").style.cssText = `
        max-height: 300px;
        overflow-y: auto;
        transition: max-height .5s ease-in, opacity .5s linear;
        opacity: 1;
        `
        if(MainLeagueSettings[1] === "doubles"){
            document.querySelector("#registration-form").style.maxHeight = "600px";
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

// skrytie optionlist pre výber krajiny a vlajky a otáčanie zobáčika
document.querySelector(".selected-country").addEventListener("click", () => {
    document.querySelector(".selected-country").classList.toggle("turnOnIcon")
    document.querySelector(".country-options-list").classList.toggle("show-country-options-list")
})

// výber krajiny užívateľom a nastavenie zvolenej krajiny ako selected-country
document.querySelector(".country-options-list").addEventListener("click", (event) => {
    // vždy jedno z flagsImg je typ Image
    const flagImg = event.target.querySelector("img")
    const flagImg2 = event.target
    const flagImg3 = event.target.previousElementSibling
    let flagsImg = [flagImg, flagImg2, flagImg3]

    let correctImg = flagsImg.filter(function(oneFlag){
        let findFlag = isImage(oneFlag)
        return findFlag
    })

    document.querySelector(".selected-country img").src = correctImg[0].src
    document.querySelector(".selected-countryName").textContent = correctImg[0].alt
    document.querySelector(".selected-country").classList.toggle("turnOnIcon")
    document.querySelector(".country-options-list").classList.toggle("show-country-options-list")
})

// funckia pre zistenie či je objekt Image slúži pre : výber krajiny užívateľom a nastavenie zvolenej krajiny ako selected-country
let isImage = function (i) {
    return i instanceof HTMLImageElement;
}


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


// Tlačítko pre vytvorenie ligy a jeho následné skrytie
document.querySelector(".createLeague-container button").addEventListener("click", () => {

    // zobrazenie názvu ligy
    document.querySelector(".leagueHeading h1").innerHTML = `
    ${nameOfLeague}
    <span class="left-icon"></span>
    <span class="right-icon"></span>
    `

    leagueMatches = []
    leagueTable = []

    // Player Info
    let playerInfo

    // registrovaná skupina pre forEach pre vytvorenie poľa hráčov
    let registerdGroup

    // vytvorenie poľa hráčov (meno a priezvisko) z už zaregistrovaných hráčov
    let players = []

    document.querySelector(".createLeague-container").classList.add("hide")

    registerdGroup = MainLeagueSettings[1] !== "teams" ? registeredPlayersArray : registeredTeamsArray

    registerdGroup.forEach((onePlayer) => {
        // match settings defined
        if (MainLeagueSettings[1] === "single") {
            playerInfo = onePlayer.firstName + " " + onePlayer.secondName
        } else if (MainLeagueSettings[1] === "doubles"){
            playerInfo = onePlayer.firstName + " - " + onePlayer.secondName
        } else {
            playerInfo = onePlayer.teamName
        }
        if(MainLeagueSettings[1] !== "teams"){
            players.push({
                player: playerInfo,
                playerId: onePlayer.id,
            })
        } else {
            players.push({
                player: playerInfo,
                playerId: onePlayer.id,
                teamPlayers: onePlayer.teamPlayers
            })
        }
        leagueTable.push({
            playerName: playerInfo,
            playerId: onePlayer.id, 
            playedMatches: 0,
            matchWinnings: 0,
            matchLosses: 0, 
            scoreWinnigs: 0, 
            scoreLosses: 0, 
            difference: 0,
            points: 0, 
            mutualMatchPoints: 0
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
    // pole z registrovanými hráčmi (meno a priezvisko, checkbox pre odvety, nastavenia [sigle, doubles, teams])
    createLeague(players, MainLeagueSettings[0], MainLeagueSettings[1])
    
    saveLeagueMatches(leagueMatches)
    

    // zavolanie funkcie pre vykreslenie ligových zápasov do div .league-matches po otvorení prehliadača/stránky
    printLeagueMatches()

    // zavolanie funkcie pre vykreslenie tabuľky výsledkov ligových zápasov do div .result-container +  results-table po otvorení prehliadača/stránky
    generateHtmlPrintLeagueTable(leagueTable, leagueMatches)    

    // print name of the league in "div leagueHeading", league matches and league table
    // document.querySelector(".leagueHeading").classList.remove("hide")
    // document.querySelector(".league-matches").classList.remove("hide")
    // document.querySelector(".leagueHeading h1").innerHTML = `
    // ${nameOfLeague}
    // <span class="left-icon"></span>
    // <span class="right-icon"></span>
    // `

    document.querySelector(".leagueHeading").classList.remove("hide")
    document.querySelector(".league-matches").classList.remove("hide")
    document.querySelector(".result-container").classList.remove("hide")
    document.querySelector(".createLeague-container").classList.add("hide")
    document.querySelector(".first-container").classList.add("hide")
    
    
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


// // === Printing league name to web site ===
// if (getLeagueName().length <= 0){
//     document.querySelector(".leagueHeading").classList.add("hide")
// } else {
//     document.querySelector(".leagueHeading").classList.remove("hide")
//     document.querySelector(".leagueHeading h1").innerHTML = `
//     ${getLeagueName()}
//     <span class="left-icon"></span>
//     <span class="right-icon"></span>
//     `
// }


// zavolanie funkcie pre vykreslenie ligových zápasov do div .league-matches po otvorení prehliadača/stránky
printLeagueMatches()

// zavolanie funkcie pre vykreslenie tabuľky výsledkov ligových zápasov do div .result-container +  results-table po otvorení prehliadača/stránky
generateHtmlPrintLeagueTable(leagueTable, leagueMatches)
