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
let playerCard2 = ''
let opponentCard1 = {}
let opponentCard2 = {}
// Constant for total number of rounds needed to win
const WINS_NEEDED = 3

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
// Get DOM objects for player win tokens and opponent win tokens
const $playerWinTokens = $('#player-win-tokens')
const $opponentWinTokens = $('#opponent-win-tokens')
// Get restart-button to reset the game
const $restartButton = $('#restart-button')
//Get end-of-game-message to display message at end of round and end of game
const $endOfGameMessage = $('#end-of-game-message')

if (
    (playerCard1.name === "Countess" && (playerCard2.name === "Prince" || playerCard2.name === "King"))
    ||
    (playerCard2.name === "Countess" && (playerCard1.name === "Prince" || playerCard1.name === "King"))
) {

    console.log(test)
}

// Listeners
// Set listener to start the game
// Create the deck, remove a card, draw 1 card for the opponent, draw 1 card for the player, discard 3 cards to their piles, set current player to player 1
$playButton.click(function() {
    $gameBoard.css('display', 'flex')
    $startGameDiv.css('display', 'none')
    deck = createDeck()
    removedCard = removeTopCard();
    // Used to discard 3 cards from the top of the deck at beginning of the game
    discardCard()
    discardCard()
    discardCard()
    drawOpponentCard1()
    drawPlayerCard1()
    player1.currentPlayer = true;
    $playerCard2.css('display', 'none')
    setDrawDeckNum()
}) 

// Set listener to start the game and start the game!
// Create the deck, remove a card, draw 1 card for the opponent, draw 1 card for the player, discard 3 cards to their piles, , set current player to player 1
// If player and opponent points = 0, remove tokens of affection, as a new game has started
$restartButton.click(function() {
    resetDiscardPiles()
    player1.currentPlayer = false;
    $restartButton.css('display', 'none')
    deck = createDeck()
    removedCard = removeTopCard();
    $removedCard.text('Removed Card - who is it?')
    // Used to discard 3 cards from the top of the deck at beginning of the game
    discardCard()
    discardCard()
    discardCard()
    drawOpponentCard1()
    drawPlayerCard1()
    player1.currentPlayer = true;
    $playerCard2.css('display', 'none')
    playerCard2 = ''
    setDrawDeckNum()
    $endOfGameMessage.text('')
    if(opponent.points === 0 && player1.points === 0) {
        $playerWinTokens.text('')
        $opponentWinTokens.text('')
    }
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
    // Only allow clicks if playerCard2 is not an empty string, otherwise, nothing will be clicked
    if(playerCard2 !== '') {
        if(players[0].currentPlayer){
            discardCard(playerCard1)                     
            $playerCard1Value.text(playerCard2.value)
            $playerCard1Name.text(playerCard2.name)
            $playerCard1Image.text(playerCard2.image)
            $playerCard1Rules.text(playerCard2.rules)
            $playerCard2.css('display', 'none')
            playerCard2 = ''        
        }
    }
})

// Will discard playerCard2, remove its display from the screen, and set it to an empty string
$playerCard2.click(function() {
    if(players[0].currentPlayer){
        discardPlayerCard2(playerCard2)
        $playerCard2.css('display', 'none')
        playerCard2 = ''
    }
})

// When the deck is clicked on, will draw a card to playerCard2 and display the block with playerCard2 in it
$drawDeck.click(function() {
    if(deck.length > 0){
        if(players[0].currentPlayer){
            drawCard()
            $playerCard2.css('display', 'flex')
        }
    }
    checkForCountess()
})

// Functions!
// Checks to see if one of the cards in hand is the Countess
// If it is, checks to see if the other is a King or Prince
// If it is, forces the player to discard the Countess, as per the card rules
function checkForCountess() {
    // Unbind playerCard2 if the Countess is in card 1 and king or prince is in card 2
    if (playerCard1.name === "Countess") {
        if(playerCard2.name === "King" || playerCard2.name === "King") {
            $playerCard2.unbind()
        }
        // Unbind playerCard1 if the Countess is in card 2 and king or prince is in card 1
    } else if (playerCard2.name === "Countess") {
        if(playerCard1.name === "King" || playerCard1.name === "Prince") {
            $playerCard1.unbind()
        }
    } else {
        // Rebind the click function if the above two conditions are not met
        $playerCard2.click(function() {
            if(players[0].currentPlayer){
                discardPlayerCard2(playerCard2)
                $playerCard2.css('display', 'none')
                playerCard2 = ''
            }
        })
        $playerCard1.click(function() {
            // Only allow clicks if playerCard2 is not an empty string, otherwise, nothing will be clicked
            if(playerCard2 !== '') {
                if(players[0].currentPlayer){
                    discardCard(playerCard1)                     
                    $playerCard1Value.text(playerCard2.value)
                    $playerCard1Name.text(playerCard2.name)
                    $playerCard1Image.text(playerCard2.image)
                    $playerCard1Rules.text(playerCard2.rules)
                    $playerCard2.css('display', 'none')
                    playerCard2 = ''        
                }
            }
        })
    }
}

// This function sets the draw deck remaining value to deck.length and updates it to the DOM
function setDrawDeckNum() {
    $drawDeck.text(`Click Here to Draw a Card Cards Remaining: ${deck.length}`)
}

// This function will discard a card to its appropriate discard pile or PlayerCard1 to its appropriate discard pile
// If there is no current player (at the start of game) will move to dicardPile function without calling on cardTakesEffect function
function discardCard(aCard) {
    if (!player1.currentPlayer && !opponent.currentPlayer) {
        aCard = deck.pop()
        placeCardInDiscardPile(aCard)        
    } else if (player1.currentPlayer) {       
        placeCardInDiscardPile(aCard) 
        playerCard1 = playerCard2  
        console.log(playerCard1)
        cardTakesEffect(aCard)
    }
}

// This function will discard playercard2 to its appropriate discard pile and NOT change the value of playerCard1
function discardPlayerCard2(aCard) {
    if (player1.currentPlayer) {       
        placeCardInDiscardPile(aCard) 
        console.log(playerCard1)
        cardTakesEffect(aCard)
    }
}

// This function will set the 1st card of player 1 to the passed in card, drawn from the deck
// It will set the remaining cards in the deck to deck.length
// This will only happen during setup of the game, one time
function drawPlayerCard1() {
    if (deck.length > 0) {
        playerCard1 = deck.pop()
        $playerCard1Value.text(playerCard1.value)
        $playerCard1Name.text(playerCard1.name)
        $playerCard1Image.text(playerCard1.image)
        $playerCard1Rules.text(playerCard1.rules)
        setDrawDeckNum()
    } 
}

// This function will set the 1st card of the opponent (player 2) to the passed in card, drawn from the deck
// It will set the remaining cards in the deck to deck.length
function drawOpponentCard1() {
    if (deck.length > 0) {
        opponentCard1 = deck.pop()
        $opponentCard1Value.text(opponentCard1.value)
        $opponentCard1Name.text(opponentCard1.name)
        $opponentCard1Image.text(opponentCard1.image)
        $opponentCard1Rules.text(opponentCard1.rules)
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

// This function will draw a card from the deck and place it in players' hand.
// If not active player (at start of game), will discard 3 cards for set-up purposes
function drawCard() {
    if(player1.currentPlayer) {
        // Prevent player form drawing cards if player has 2 cards in hand already
        if (deck.length > 0 && playerCard2 === '') {
            playerCard2 = deck.pop()
            $playerCard2Value.text(playerCard2.value)
            $playerCard2Name.text(playerCard2.name)
            $playerCard2Image.text(playerCard2.image)
            $playerCard2Rules.text(playerCard2.rules)
            setDrawDeckNum()
        } 
    } else if (opponent.currentPlayer) {
        // Does nothing for now
    }
}

// This function will call the appropriate function for the card that was just discarded by the player
function cardTakesEffect(aCard) {
    console.log('cardTakesEffect testing')
    switch(aCard.name) {
        case "Guard":
            // guardEffect()
            break;
        case "Priest":
            // priestEffect()
            break;
            case "Baron":
            // baronEffect()
            break;
        case "Handmaid":
            // handmaidEffect()
            break;
        case "Prince":
            // princeEffect()
            break;
        case "King":
            // kingEffect()
            break;
        case "Countess":
            // countessEffect()
            break;
        case "Princess":
            princessEffect()
            break;
        default:
            break;
    }    
    if (deck.length === 0 && player1.currentPlayer) {
        checkForEmptyDeckWin()
    }
}

function guardEffect() {
    
}

function priestEffect() {

}

function baronEffect() {
    console.log(`if baron is discarded, compare your remaining card's value with the opponoent's card value.  Lower value is out`  )
}

function handmaidEffect() {

}

function princeEffect() {

}

function kingEffect() {

}

function countessEffect() {
    console.log('If countess in hand along with a prince or a king, you must discard the countess')
}
// If the princess is discarded, the opponent wins.
function princessEffect() {
    // console.log('if princess is discarded, you lose the game')
    // $endOfGameMessage.text('Princess was discarded, opponent wins.')
    // player1.currentPlayer = false;
    // $restartButton.css('display', 'block')
    // giveOpponentTokenOfAffection()
}

// Give the player a token of affection, based off of the card's effects
function givePlayerTokenOfAffection() {
    player1.points += 1
    let winText = ''
    $endOfGameMessage.text('Player 1 wins a token of affection from the Princess')
    $playerWinTokens.text('')        
    for (let i = 0; i < player1.points; i++) {
        winText += `\u2665 `          
    }   
    $playerWinTokens.text(winText) 
    if (player1.points === WINS_NEEDED) {
        $endOfGameMessage.text("Player 1 has won the heart of the Princess!")
        player1.points = 0
        opponent.points = 0
    }
}

// Give the opponent a token of affection, based off of the card's effects.
function giveOpponentTokenOfAffection() {
    opponent.points += 1
    let winText = ''
    $endOfGameMessage.text('Opponent wins a token of affection from the Princess')
    for (let i = 0; i < opponent.points; i++) {
        winText += `\u2665 `          
    }
    $opponentWinTokens.text(winText)
    if (opponent.points === WINS_NEEDED) {
        $endOfGameMessage.text("Opponent has won the heart of the Princess!")
        opponent.points = 0
        player1.points = 0
    }
}

// Increase win token count when the deck is empty(little hearts would be cute as tokens)
// Player with higher-valued card at the end receives the win token (<3)
// Ties mean no one gets a token
// If a player has 3 total wins, they are the ultimate winner
// Reveal the name of the removed card
// Called at the end of the cardTakesEffect function if 0 cards are left in the deck AFTER the card effect takes place
function checkForEmptyDeckWin() {
    $removedCard.text(`The removed card was: ${removedCard.name}`)
    if (playerCard1.value > opponentCard1.value) {
        givePlayerTokenOfAffection()
        console.log('player 1 wins - test')
    } else if (opponentCard1.value > playerCard1.value) {
        giveOpponentTokenOfAffection()
    } else if ((playerCard1.value === opponentCard1.value)) {
        $endOfGameMessage.text('No one wins a token of affection from the Princess. You bore her.')
    }
    $restartButton.css('display', 'block')
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

// Reset the discard piles and their text when restart button is clicked
function resetDiscardPiles() {
    discardedGuards = 0;
    discardedPriests = 0;
    discardedBarons = 0;
    discardedHandmaids = 0;
    discardedPrinces = 0;
    discardedKing = 0;
    discardedCountess = 0;
    discardedPrincess = 0;
    $discardedGuards.text(`${discardedGuards}`)
    $discardedPriests.text(`${discardedPriests}`)
    $discardedBarons.text(`${discardedBarons}`)
    $discardedHandmaids.text(`${discardedHandmaids}`)
    $discardedPrinces.text(`${discardedPrinces}`)
    $discardedKing.text(`${discardedKing}`)
    $discardedCountess.text(`${discardedCountess}`)
    $discardedPrincess.text(`${discardedPrincess}`)
}


// Start to implement card rules 
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

// Stretch Goals
//     Confirmation of card to discard each turn
//     Confirmation of Guard Guess choice
//     Check to see if all of one card has been played already, removing the option of that card to be guessed with a Guard Guess
//      Create a pop-up modal for the guard guess that only appears when the guard is discarded, asking for your selection
//     Play against yourself with two active hands
//     Play against an AI who makes basic decisions (as simple as possible, with very few AI logic rules)