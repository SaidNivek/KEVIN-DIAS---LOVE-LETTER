// Global variable declarations
// Objects for the cards, with values, image, rules, number in deck, and name assigned
const cards = [
    guard = {
        name: "Guard",
        value: 1,        
        image: "Guard Image",
        rules: "Name a non-guard card.  If opponent has that card in hand, they are out of the round.",
        numInDeck: 5,
    },
    priest = {
        name: "Priest",
        value: 2,        
        image: "Priest Image",
        rules: "Look at opponent's hand",
        numInDeck: 2,
    },
    baron = {
        name: "Baron",
        value: 3,        
        image: "Baron Image",
        rules: "Compare hands with your opponent. The player with the lower value is out of the round. If tied, nothing happens.",
        numInDeck: 2,
    },
    handmaid = {
        name: "Handmaid",
        value: 4,        
        image: "Handmaid Image",
        rules: "Until your next turn, ignore all effects from opponent's cards.",
        numInDeck: 2,
    },
    prince = {
        name: "Prince",
        value: 5,        
        image: "Prince Image",
        rules: "Choose yourself or another player to discard their hand and draw a new card.",
        numInDeck: 2,
    },
    king = {
        name: "King",
        value: 6,        
        image: "King Image",
        rules: "Trade hands with opponent.",
        numInDeck: 1,
    },
    countess = {
        name: "Countess",
        value: 7,        
        image: "Countess Image",
        rules: "If you have this card and the King or Prince in your hand, you MUST discard the Countess.",
        numInDeck: 1,
    },
    princess = {
        name: "Princess",
        value: 8,        
        image: "Princess Image",
        rules: "If you discard the Princess, you are out of the round.",
        numInDeck: 1,
    },
]

// Objects for the player and opponent, to keep track of active player and points
// Might not need currentPlayer key, if using if(player[0.name] === currentPlayer) to check current turn
const players = [
    player1 = {
        name: "player1",
        points: 0,
        currentPlayer: false,
    },
    opponent = {
        name: "opponent",
        points: 0,
        currentPlayer: false,
    },
]

// Deck array for all of the cards to be contained within it for drawing
let deck = []
// Empty object for the removed card, which is removed at the start of game and revealed at the end of the game (stretch)
let removedCard = {}
// Variables to hold the number of discarded cards, updated throughout the course of a game
let discardedGuards = 0;
let discardedPriests = 0;
let discardedBarons = 0;
let discardedHandmaids = 0;
let discardedPrinces = 0;
let discardedKing = 0;
let discardedCountess = 0;
let discardedPrincess = 0;
// Objects to hold the cards that are drawn for later purposes
let playerCard1 = {}
let playerCard2 = {}
let opponentCard1 = {}
let opponentCard2 = {}

// DOM Object grabs
// Get the objects for the play button to reveal the board
const $playButton = $('#play-button')
const $gameBoard = $('.gameboard-div')
const $startGameDiv = $('#start-game-div')
// Get the objects from the DOM for the general game rules modal
const $generalRulesOpenButton = $('#open-general-rules-modal');
const $generalRulesModal = $('#general-rules-modal');
const $generalRulesCloseButton = $('#general-rules-close')
// Get the objects from the DOM for the card game rules modal
const $cardRulesOpenButton = $('#open-card-rules-modal')
const $cardRulesModal = $('#card-rules-modal');
const $cardRulesCloseButton = $('#card-rules-close')
// Get the objects for player card 1
const $playerCard1 = $('#player-card-1')
const $playerCard1Value = $('#player-card-1-value')
const $playerCard1Name = $('#player-card-1-name')
const $playerCard1Image = $('#player-card-1-image')
const $playerCard1Rules = $('#player-card-1-rules')
//Get the objects for player card 2
const $playerCard2 = $('#player-card-2')
const $playerCard2Value = $('#player-card-2-value')
const $playerCard2Name = $('#player-card-2-name')
const $playerCard2Image = $('#player-card-2-image')
const $playerCard2Rules = $('#player-card-2-rules')
//Get the objects for opponent card 1 (for testing, will not be revealed in regular game)
const $opponentCard1 = $('#opponent-card-1')
const $opponentCard1Value = $('#opponent-card-1-value')
const $opponentCard1Name = $('#opponent-card-1-name')
const $opponentCard1Image = $('#opponent-card-1-image')
const $opponentCard1Rules = $('#opponent-card-1-rules')
// Get DOM objects for the draw deck and the removed card position
const $drawDeck = $('#draw-deck')
const $removedCard = $('#removed-card')
// Get DOM objects for the spans in the discard pile
const $discardedGuards = $('#discarded-guard')
const $discardedPriests = $('#discarded-priest')
const $discardedBarons = $('#discarded-baron')
const $discardedHandmaids = $('#discarded-handmaid')
const $discardedPrinces = $('#discarded-prince')
const $discardedKing = $('#discarded-king')
const $discardedCountess = $('#discarded-countess')
const $discardedPrincess = $('#discarded-princess')


// Listeners
// Set listener to start the game and start the game!
// Create the deck, remove a card, draw 1 card for the opponent, draw 2 cards for the player
$playButton.click(function(event) {
    $gameBoard.css('display', 'flex')
    $startGameDiv.css('display', 'none')
    deck = createDeck()
    removedCard = removeTopCard();
    setDrawDeckNum()
    drawCard()
    drawOpponentCard1()
    drawPlayerCard1()
    player1.currentPlayer = true;
    $playerCard2.css('display', 'none')
}) 

// Set listeners to open the general and card rule modals
$generalRulesOpenButton.click(function() {
    $generalRulesModal.css('display', 'block')
})
$cardRulesOpenButton.click(function() {
    $cardRulesModal.css('display', 'block')
})
// Set listeners to close the general and card rule modals
$generalRulesCloseButton.click(function() {
    $generalRulesModal.css('display', 'none')
})
$cardRulesCloseButton.click(function() {
    $cardRulesModal.css('display', 'none')
})

// Set listeners for the player cards to select and discard them
$playerCard1.click(function() {
    if(players[0].currentPlayer){
        discardCard(playerCard1)
        playerCard1 = playerCard2
        $playerCard1Value.text(playerCard2.value)
        $playerCard1Name.text(playerCard2.name)
        $playerCard1Image.text(playerCard2.image)
        $playerCard1Rules.text(playerCard2.rules)
        $playerCard2.css('display', 'none')
        playerCard2 = {}        
    }
})

$playerCard2.click(function() {
    if(players[0].currentPlayer){
        discardCard(playerCard2)
        $playerCard2.css('display', 'none')
        playerCard2 = {}
        // $playerCard2Value.text(playerCard2.value)
        // $playerCard2Name.text(playerCard2.name)
        // $playerCard2Image.text(playerCard2.image)
        // $playerCard2Rules.text(playerCard2.rules)
    }
})

$drawDeck.click(function() {
    if(deck.length > 0){
        if(players[0].currentPlayer){
            drawCard()
            $playerCard2.css('display', 'flex')
        }
    }
})


// Functions!
// This function sets the draw deck remaining value to deck.length and updates it to the DOM
function setDrawDeckNum() {
    $drawDeck.text(`Cards Remianing: ${deck.length}`)
}

// This function will set the 1st card of player 1 to the passed in card, drawn from the deck
// It will set the remaining cards in the deck to deck.length
// If deck is empty, change the card to show the deck is empty
function drawPlayerCard1() {
    if (deck.length > 0) {
        playerCard1 = deck.pop()
        $playerCard1Value.text(playerCard1.value)
        $playerCard1Name.text(playerCard1.name)
        $playerCard1Image.text(playerCard1.image)
        $playerCard1Rules.text(playerCard1.rules)
        setDrawDeckNum()
    } else {
        $playerCard1Value.text('')
        $playerCard1Name.text('')
        $playerCard1Image.text('some image denoting empty')
        $playerCard1Rules.text('No cards left in deck')
        playerCard1 = ''
        checkForWin()
    }
}

// This function will set the 1st card of the opponent (player 2) to the passed in card, drawn from the deck
// It will set the remaining cards in the deck to deck.length
function drawOpponentCard1() {
    if (deck.length > 0) {
        let opponentCard = deck.pop()
        $opponentCard1Value.text(opponentCard.value)
        $opponentCard1Name.text(opponentCard.name)
        $opponentCard1Image.text(opponentCard.image)
        $opponentCard1Rules.text(opponentCard.rules)
        setDrawDeckNum()
    }
}

// This function returns a randomized deck of cards, with the correct number of each card, as denoted in the individual card's object
function createDeck() {
    let aDeck = []
    let randomizedDeck = []
    for(let i = 0; i < cards.length; i++) {
        for(let j = 0; j < cards[i].numInDeck; j++) {
            aDeck.push(cards[i])
        }
    }
    while(aDeck.length > 0) {
        let aCard = aDeck.splice([Math.floor(Math.random() * aDeck.length)], 1)[0]
        randomizedDeck.push(aCard)
    }
    return randomizedDeck
}
// This function removes the top card from the game to provide some randomness to the rest of the game, specifically guard guesses
function removeTopCard() {
    return deck.pop()
}

// Thia function will draw a card from the deck and place it in players' hand.
// If not active player (at start of game), will discard 3 cards for set-up purposes
function drawCard() {
    if(player1.currentPlayer) {
        if (deck.length > 0) {
            playerCard2 = deck.pop()
            $playerCard2Value.text(playerCard2.value)
            $playerCard2Name.text(playerCard2.name)
            $playerCard2Image.text(playerCard2.image)
            $playerCard2Rules.text(playerCard2.rules)
            setDrawDeckNum()
        } else {
            $playerCard2Value.text('')
            $playerCard2Name.text('')
            $playerCard2Image.text('some image denoting empty')
            $playerCard2Rules.text('No cards left in deck')
            playerCard2 = {}
        }
    } else if (opponent.currentPlayer) {

    } else {
        // If no active player, discard 3 cards from the deck, only at start of game for set up
        discardCard()
        discardCard()
        discardCard()
    }
}

// This function will discard a card to its appropriate discard pile
// If there is no current player (at the start of game) will move to dicardPile function without calling on cardTakesEffect function
function discardCard(aCard) {
    if (!player1.currentPlayer && !opponent.currentPlayer) {
        aCard = deck.pop()
        placeCardInDiscardPile(aCard)        
    } else if (player1.currentPlayer) {       
        placeCardInDiscardPile(aCard)        
        cardTakesEffect()
    }
}

function cardTakesEffect() {
    console.log('cardTakesEffect testing')
}

// This function will take the discarded card and add it to that card's specific discard pile, keeping track of total discarded
// This is important for the guard guess function, which allows you to guess the opponent's card
function placeCardInDiscardPile(aCard) {
    switch(aCard.name) {
        case "Guard":
            $discardedGuards.text(`${++discardedGuards}`)
            break;
        case "Priest":
            $discardedPriests.text(`${++discardedPriests}`)
            break;
        case "Baron":
            $discardedBarons.text(`${++discardedBarons}`)
            break;
        case "Handmaid":
            $discardedHandmaids.text(`${++discardedHandmaids}`)
            break;
        case "Prince":
            $discardedPrinces.text(`${++discardedPrinces}`)
            break;
        case "King":
            $discardedKing.text(`${++discardedKing}`)
            break;
        case "Countess":
            $discardedCountess.text(`${++discardedCountess}`)
            break;
        case "Princess":
            $discardedPrincess.text(`${++discardedPrincess}`)
            break;
        default:
            break;
    }
}

function checkForWin() {
    console.log("Test check for win function")
}

// Be able to select a card from the two in hand and play/discard it
// Draw cards until the deck is empty, ensuring that all cards are correctly displayed
// Increase win token count when the deck is empty(little hearts would be cute as tokens)
//     Player with higher-valued card at the end receives the win token
//     Set dummy card to different values to test this condition
//     Ties mean no one gets a token
// After a card is discarded, put them in the center with a number to signify how many have been played so far this round
// Start to implement game rules 
//     Guard - Create simple selection of possible cards the opponent has (buttons)
//             Ensure the buttons work and can correctly identify the dummy card given to opponent
//             A match means the player gets a win token
//     Priest - Reveal the opponent's dummy card for 5 seconds
//     Baron - Compare the player's not discarded card with the opponent's dummy card
//             Ensure that the logic can identify the values of both cards and compare, ties do nothing
//             If player has a lower value card, opponent gets a win token
//             If player has a higher value card, player gets a win token
//     Handmaid - Player is untargetable by opponents' card effects until next turn (stretch goal with two players)
//             Guard, Priest, Baron, Prince, King have no effect while Handmaid is active
//     Prince - Choose who should discard and draw a new card, player or opponent      
//             If self, draw a card from the deck
//             If opponent, give them a new dummy card (for now)
//             If Princess is discarded, the discarding player loses and opponent gets a win token
//     King - Trade cards with the opponent (player would acquire the dummy card, opponent would receive a real card for this test)
//     Countess - If your other card is a Prince or a King, the Countess MUST be discarded
//             Can still discard if the other card is not a Prince or a King
//     Princess - Lose the game if discarded
// Reveal the card removed from the game atthe beginning of the round

// Stretch Goals
//     Confirmation of card to discard each turn
//     Confirmation of Guard Guess choice
//     Check to see if all of one card has been played already, removing the option of that card to be guessed with a Guard Guess
//     Play against yourself with two active hands
//     Play against an AI who makes basic decisions (as simple as possible, with very few AI logic rules)

