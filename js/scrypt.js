// Global settings
let btnAddPlayer = document.querySelector('#btnAddPlayer')
let inputField = document.querySelector('#player')
let listOfPlayers = document.querySelector('#listOfPlayers')
let btnStart = document.querySelector('#btnStart')
let startScreen = document.querySelector('.start-screen')
let gameScreen = document.querySelector('.game-screen')
let player = document.querySelector('li')
let playerName1 = document.querySelector('#player-name1')
let playerName2 = document.querySelector('#player-name2')
let playerName3 = document.querySelector('#player-name3')
let playerName4 = document.querySelector('#player-name4')
let playerPoint1 = document.querySelector('#player-point1')
let playerPoint2 = document.querySelector('#player-point2')
let playerPoint3 = document.querySelector('#player-point3')
let playerPoint4 = document.querySelector('#player-point4')
let lists = listOfPlayers.getElementsByTagName('li')
let arrayOfPlayers = []
let arrayOfPoints = []
let nextTurnButton = document.querySelector('.next-turn')

// Adding players
btnAddPlayer.addEventListener('click', addPlayer)

function addPlayer() {

    if (lists.length < 4) {
        let player = document.createElement('li')
        player.innerHTML = inputField.value
        arrayOfPlayers.push(inputField.value)
        arrayOfPoints.push(301)
        listOfPlayers.append(player)
        localStorage.setItem('player', JSON.stringify(arrayOfPlayers))
        localStorage.setItem('points', JSON.stringify(arrayOfPoints))

        //Initial settings
        localStorage.setItem('numberOfPlayers', arrayOfPoints.length-1)
        localStorage.setItem('currentPlayer', 0)
        localStorage.setItem('numberOfShoots', 0)

        inputField.value = ''
        console.log(arrayOfPlayers)
    } else {
        alert('Maximum number of players is 4')
    }


}

// Starting the game
btnStart.addEventListener('click', startGame)

function startGame() {
    startScreen.classList.add('hidden')
    gameScreen.classList.add('active')
    console.log('start game')
    let x = localStorage.getItem('player')
    let players = JSON.parse(x)
    let y = localStorage.getItem('points')
    let points = JSON.parse(y)


    if (players.length == 1) {
        playerName1.innerHTML = players[0]
        playerName2.classList.add('hidden')
        playerName3.classList.add('hidden')
        playerName4.classList.add('hidden')
        playerPoint1.innerHTML = points[0]
        playerPoint2.classList.add('hidden')
        playerPoint3.classList.add('hidden')
        playerPoint4.classList.add('hidden')
    } else if (players.length == 2) {
        playerName1.innerHTML = players[0]
        playerName2.innerHTML = players[1]
        playerName3.classList.add('hidden')
        playerName4.classList.add('hidden')
        playerPoint1.innerHTML = points[0]
        playerPoint2.innerHTML = points[1]
        playerPoint3.classList.add('hidden')
        playerPoint4.classList.add('hidden')
    } else if (players.length == 3) {
        playerName1.innerHTML = players[0]
        playerName2.innerHTML = players[1]
        playerName3.innerHTML = players[2]
        playerName4.classList.add('hidden')
        playerPoint1.innerHTML = points[0]
        playerPoint2.innerHTML = points[1]
        playerPoint3.innerHTML = points[2]
        playerPoint4.classList.add('hidden')
    } else {
        playerName1.innerHTML = players[0]
        playerName2.innerHTML = players[1]
        playerName3.innerHTML = players[2]
        playerName4.innerHTML = players[3]
        playerPoint1.innerHTML = points[0]
        playerPoint2.innerHTML = points[1]
        playerPoint3.innerHTML = points[2]
        playerPoint4.innerHTML = points[3]
    }

}

// Clicking on darts table
let clickablePoints = document.querySelectorAll('.game-field')
clickablePoints.forEach(element => {
    element.addEventListener('click', showPointsModal)
})

function showPointsModal(e) {
    document.querySelector('.game-modal').classList.add('visible')

    sessionStorage.setItem('currentField', this.dataset.points)

    let multiply = document.querySelector('input[name="point"]:checked').value
    
    let currentPlayer = localStorage.getItem('currentPlayer')

    let y = localStorage.getItem('points')
    let points = JSON.parse(y)
    //console.log(parseInt(this.dataset.points))
    points[currentPlayer] = parseInt(points[currentPlayer]) - parseInt(this.dataset.points) * parseInt(multiply)
    //playerPoint1.innerHTML = points[currentPlayer]

    if ( points[currentPlayer] < 0 ) {
        points[currentPlayer] = parseInt(points[currentPlayer]) + parseInt( this.dataset.points) * parseInt(multiply)
        alert ('Negative score!')
    }

    if ( points[currentPlayer] == 0) {
        let winner = localStorage.getItem('player')
        let winnerName = JSON.parse(winner)
        alert('The Winner is ' + winnerName[currentPlayer])
    }
    
    switch (currentPlayer) {
        case '0':
            playerPoint1.innerHTML = points[currentPlayer] 
            break;
        case '1':
            playerPoint2.innerHTML = points[currentPlayer] 
            break;
        case '2':
            playerPoint3.innerHTML = points[currentPlayer] 
            break;
        case '3':
            playerPoint4.innerHTML = points[currentPlayer] 
            break;
        default:
          text = "No value found";
      }


    localStorage.setItem('points', JSON.stringify(points))
    let numberOfPlayers = parseInt(localStorage.getItem('numberOfPlayers'))

    let numberOfTries = parseInt(localStorage.getItem('numberOfShoots'))
    numberOfTries++
    if (numberOfTries >= 3) {
        numberOfTries = 0;
        nextTurnFunction();
    }
    localStorage.setItem('numberOfShoots', numberOfTries)
}


// Adding single/double/triple points
/* let modalPoints = document.querySelectorAll('.game-points-multiplier')
modalPoints.forEach(element => {
    element.addEventListener('click', multiplyPoints)
})

function multiplyPoints(e) {
    let z = sessionStorage.getItem('currentField')
    let currentPlayer = localStorage.getItem('currentPlayer')
    
    switch (currentPlayer) {
        case '0':
            playerPoint1.innerHTML = z * this.dataset.multiply
            break;
        case '1':
            playerPoint2.innerHTML = z * this.dataset.multiply
            break;
        case '2':
            playerPoint3.innerHTML = z * this.dataset.multiply
            break;
        case '3':
            playerPoint4.innerHTML = z * this.dataset.multiply
            break;
        default:
          text = "No value found";
      }
      let currentPlayer2 = localStorage.getItem('currentPlayer')

      let y = localStorage.getItem('points')
      let points = JSON.parse(y)
      points[currentPlayer] = parseInt(points[currentPlayer2]) - parseInt( this.dataset.points);
      
      localStorage.setItem('points', JSON.stringify(points))
    document.querySelector('.game-modal').classList.remove('visible')
} */


// Next turn // Next player

nextTurnButton.addEventListener('click', nextTurnFunction)
function nextTurnFunction() {
    let currentPlayer = parseInt(localStorage.getItem('currentPlayer'))
    let numberOfPlayers = parseInt(localStorage.getItem('numberOfPlayers'))

    // Next player
    currentPlayer++
    if (currentPlayer > numberOfPlayers) {
        currentPlayer = 0;
    }
    localStorage.setItem('currentPlayer', currentPlayer)
}