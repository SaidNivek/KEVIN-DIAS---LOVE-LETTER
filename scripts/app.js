// Global variable declarations
// Objects for the cards, with values, image, rules, number in deck, and name assigned
const cards = [
    emptyCard = {        
            name: "No Cards Left",
            value: 0,        
            image: "Empty Image",
            rules: "No cards left, you lose the round",
            numInDeck: 0,
    },
    guard = {
        name: "Guard",
        value: 1,        
        image: "./images/guard.jpg",
        rules: "Name a non-guard card.  If opponent has that card in hand, they are out of the round.",
        numInDeck: 5,

    },
    priest = {
        name: "Priest",
        value: 2,        
        image: "./images/priest.jpg",
        rules: "Look at opponent's hand",
        numInDeck: 2,
    },
    baron = {
        name: "Baron",
        value: 3,        
        image: "./images/baron.jpg",
        rules: "Compare hands with your opponent. The player with the lower value is out of the round. If tied, nothing happens.",
        numInDeck: 2,
    },
    handmaid = {
        name: "Handmaid",
        value: 4,        
        image: "./images/handmaid.jpg",
        rules: "Until your next turn, ignore all effects from opponent's cards.",
        numInDeck: 2,
    },
    prince = {
        name: "Prince",
        value: 5,        
        image: "./images/prince.jpg",
        rules: "Choose yourself or another player to discard their hand and draw a new card.",
        numInDeck: 2,
    },
    king = {
        name: "King",
        value: 6,        
        image: "./images/king.jpg",
        rules: "Trade hands with opponent.",
        numInDeck: 1,
    },
    countess = {
        name: "Countess",
        value: 7,        
        image: "./images/countess.jpg",
        rules: "If you have this card and the King or Prince in your hand, you MUST discard the Countess.",
        numInDeck: 1,
    },
    princess = {
        name: "Princess",
        value: 8,        
        image: "./images/princess.jpg",
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
let discardedGuards = 0
let discardedPriests = 0
let discardedBarons = 0
let discardedHandmaids = 0
let discardedPrinces = 0
let discardedKing = 0
let discardedCountess = 0
let discardedPrincess = 0
// Objects to hold the cards that are drawn for later purposes
let playerCard1 = {}
let playerCard2 = ''
let opponentCard1 = {}
let opponentCard2 = {}
// Constant for total number of rounds needed to win
const WINS_NEEDED = 3
// Needed to check for rebinds on the $drawDeck (fix this hack-y way later)
let lastCardPlayed = {}
// Constant for the heart image for win tokens
const HEART_IMAGE = "./images/heart.png"
// Variable for the clickedGuess needed for the guardEffect()
let clickedGuess

// DOM Object grabs
// Get the objects for the play button to reveal the board
const $playButton = $('#play-button')
const $gameBoard = $('.gameboard-div')
const $startGameDiv = $('#start-game-div')
const $deckAreaDiv = $('#deck-area-div')
// Get the objects from the DOM for the general game rules modal
const $generalRulesOpenButton = $('#open-general-rules-modal')
const $generalRulesModal = $('#general-rules-modal')
const $generalRulesCloseButton = $('#general-rules-close')
// Get the objects from the DOM for the card game rules modal
const $cardRulesOpenButton = $('#open-card-rules-modal')
const $cardRulesModal = $('#card-rules-modal')
const $cardRulesCloseButton = $('#card-rules-close')
// Get the objects for player card 1
const $playerCard1 = $('#player-card-1')
const $playerCard1Image = $('#player-card-1-image')
//Get the objects for player card 2
const $playerCard2 = $('#player-card-2')
const $playerCard2Image = $('#player-card-2-image')
//Get the objects for opponent card 1 (for testing, will not be revealed in regular game)
const $opponentCard1 = $('#opponent-card-1')
const $opponentCard1Image = $('#opponent-card-1-image')
// Get DOM objects for the draw deck and the removed card position
const $drawDeck = $('#draw-deck')
const $removedCard = $('#removed-card')
const $cardsremaining = $('#cards-remaining')
const $removedCardImage = $('#removed-card-image')
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
//Get end-of-game-messages to display message at end of round and end of game
const $endOfGameMessage = $('#end-of-game-message')
const $supplementalEndOfGameMessage = $('#supplemental-end-of-game-message')
// Get prince effect modal to display and buttons to select who should discard a card
const $princeEffectModal = $('#prince-effect-modal')
const $princeDiscardPlayer1Card = $('#prince-effect-player1-button')
const $princeDiscardOpponentCard = $('#prince-effect-opponent-button')
// Get guard effect modal to display buttons to guess which card the opponent has
const $guardEffectModal = $('#guard-effect-modal')
//Get guard guess buttons to select the card you want to guess
const $guardGuessButtons = $('.guess-button')
const $guessPriestButton = $('#guess-priest-button')
const $guessBaronButton = $('#guess-baron-button')
const $guessHandmaidButton = $('#guess-handmaid-button')
const $guessPrinceButton = $('#guess-prince-button')
const $guessKingButton = $('#guess-king-button')
const $guessCountessButton = $('#guess-countess-button')
const $guessPrincessButton = $('#guess-princess-button')

// Listeners
// Set listener to start the game
// Create the deck, remove a card, draw 1 card for the opponent, draw 1 card for the player, discard 3 cards to their piles, set current player to player 1
$playButton.click(function() {
    $gameBoard.css('display', 'flex')
    $startGameDiv.css('display', 'none')
    $deckAreaDiv.css('display', 'block')
    deck = createDeck()
    removedCard = removeTopCard()
    // Used to discard 3 cards from the top of the deck at beginning of the game
    discardCard()
    discardCard()
    discardCard()
    drawOpponentCard1()
    drawPlayerCard1()
    player1.currentPlayer = true
    $playerCard2.css('display', 'none')
    setDrawDeckNum()
}) 

// Set listener to restart the game!
// Create the deck, remove a card, draw 1 card for the opponent, draw 1 card for the player, discard 3 cards to their piles, , set current player to player 1
// If player and opponent points = 0, remove tokens of affection, as a new game has started
$restartButton.click(function() {
    if(lastCardPlayed === "Baron") {
        setDrawDeckListener()
    }
    lastCardPlayed = ''
    resetDiscardPiles()
    player1.currentPlayer = false
    $restartButton.css('display', 'none')
    deck = createDeck()
    removedCard = removeTopCard()
    $removedCard.text('Removed Card - who is it?')
    // Used to discard 3 cards from the top of the deck at beginning of the game
    discardCard()
    discardCard()
    discardCard()
    drawOpponentCard1()
    drawPlayerCard1()
    player1.currentPlayer = true
    $playerCard2.css('display', 'none')
    $removedCardImage.css('background-image', 'url(/images/cardback.png)')
    playerCard2 = ''
    setDrawDeckNum()
    $endOfGameMessage.text('')
    $supplementalEndOfGameMessage.text('')
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
            $playerCard1Image.attr('src', playerCard2.image)               
            $playerCard2.css('display', 'none')
            playerCard2 = ''        
        }
    }
})

// Set listeners for the guard guess buttons
$guardGuessButtons.click(function() {
    clickedGuess = $(this).val()
    //Hide the modal again
    $guardEffectModal.css('display', 'none')
    // Call the guardComparison function with the current value of clickedGuess
    guardComparison(clickedGuess)
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
        if(player1.currentPlayer){
            drawCard()
            $playerCard2.css('display', 'flex')
            $endOfGameMessage.text('')
        }
    }
    checkForCountess()
})

function setDrawDeckListener() {
    $drawDeck.click(function() {
        if(deck.length > 0){
            if(players[0].currentPlayer){
                drawCard()
                $playerCard2.css('display', 'flex')
            }
        }
        checkForCountess()
    })
}

// Functions!
// Checks to see if one of the cards in hand is the Countess
// If it is, checks to see if the other is a King or Prince
// If it is, forces the player to discard the Countess, as per the card rules
function checkForCountess() {
    // Unbind playerCard2 if the Countess is in card 1 and king or prince is in card 2
    if (playerCard1.name === "Countess") {
        if(playerCard2.name === "King" || playerCard2.name === "Prince") {
            $playerCard2.unbind()
        }
        // Unbind playerCard1 if the Countess is in card 2 and king or prince is in card 1
    } else if (playerCard2.name === "Countess") {
        if(playerCard1.name === "King" || playerCard1.name === "Prince") {
            $playerCard1.unbind()
        }
    } else {
        // Rebind the click function if the above two conditions are not met
        // Hackey answer, but unbind every time this runs, then rebind it to make it work for now
        $playerCard2.unbind()
        $playerCard2.click(function() {
            if(players[0].currentPlayer){
                discardPlayerCard2(playerCard2)
                $playerCard2.css('display', 'none')
                playerCard2 = ''
            }
        })
        $playerCard1.unbind()
        $playerCard1.click(function() {
            // Only allow clicks if playerCard2 is not an empty string, otherwise, nothing will be clicked
            if(playerCard2 !== '') {
                if(players[0].currentPlayer){
                    discardCard(playerCard1)   
                    $playerCard1Image.attr('src', playerCard2.image)               
                    $playerCard2.css('display', 'none')
                    playerCard2 = ''        
                }
            }
        })
    }
}

// This function sets the draw deck remaining value to deck.length and updates it to the DOM
function setDrawDeckNum() {
    $cardsremaining.text(`Cards Remaining: ${deck.length}`)
}

// This function will discard a card to its appropriate discard pile or PlayerCard1 to its appropriate discard pile
// If there is no current player (at the start of game) will move to dicardPile function without calling on cardTakesEffect function
// Also used in the princeEffect() function
function discardCard(aCard) {
    if (!player1.currentPlayer && !opponent.currentPlayer) {
        aCard = deck.pop()
        placeCardInDiscardPile(aCard)        
    } else if (player1.currentPlayer) {       
        placeCardInDiscardPile(aCard) 
        cardTakesEffect(aCard)
        playerCard1 = playerCard2  
        console.log(playerCard1)
        // Guard has some special rules that need to be asynchronous, will work on that later
             
    }
}

function discardOpponentCard(aCard) {
    if (player1.currentPlayer) {
        if (deck.length > 0) {
            placeCardInDiscardPile(aCard) 
        }      
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
// This will only happen during setup of the game, one time and during the princeEffect()
function drawPlayerCard1() {
    if (deck.length > 0) {
        playerCard1 = deck.pop()
        $playerCard1Image.attr('src', playerCard1.image)
        setDrawDeckNum()
    } 
}

// This function will set the 1st card of the opponent (player 2) to the passed in card, drawn from the deck
// It will set the remaining cards in the deck to deck.length
function drawOpponentCard1() {
    if (deck.length > 0) {
        opponentCard1 = deck.pop()
        $opponentCard1Image.attr('src', opponentCard1.image)
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
            $playerCard2Image.attr('src', playerCard2.image)
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
            // Set currentPlayer to flase to prevent end of deck win from happening
            // if (deck.length === 0) {
            //     player1.currentPlayer = false;
            // }
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
            // Set currentPlayer to flase to prevent end of deck win from happening
            // if (deck.length === 0) {
            //     player1.currentPlayer = false;
            // }
            // princeEffect()
            break;
        case "King":
            // kingEffect()
            break;
        case "Countess":
            // checkForCountess function created to deal with Countess pre-discard rule
            // This is the only card that requires this type of rule, which is checked after every draw
            break;
        case "Princess":
            // princessEffect()
            break;
        default:
            break;
    }    
    if (deck.length === 0 && player1.currentPlayer) {
        checkForEmptyDeckWin()
    }
}

//This function pops open the guard modal for player guess selection
// Might need some asyncronous stuff here to wait for the click, but gonna hack it for now
function guardEffect() {
    // reveal the guard guess modal
    $guardEffectModal.css('display', 'flex')
}

// This function compares the value of the clicked guess with the opponent's current card.  If the two are the same, the opponent is removed from the game and the player receives a point.
function guardComparison(aClick) {
    if (aClick === opponentCard1.name) {
        player1.currentPlayer = false
        givePlayerTokenOfAffection()
        $supplementalEndOfGameMessage.text("You guess correctly! You steal your opponent's letter away and burn it.")
        $restartButton.css('display', 'block')
    } else if (aClick !== opponentCard1.name) {
        $supplementalEndOfGameMessage.text("You guessed incorrectly. Try harder next time.")
    }
    if (aClick !== opponentCard1.name && deck.length === 0){
        player1.currentPlayer = true
        checkForEmptyDeckWin()
    }
}

// Not in MVP
// Allows the user of the priest to look at the opponent's card
// Not in MVP because the opponent's card is a random dumym card
function priestEffect() {

}

// Compare your remaining card with the opponent's card in hand.  THe lower value loses and that player is removed from the game.
function baronEffect() {
    if (playerCard1.value > opponentCard1.value) {
        console.log('player 1 baron wins - test')
        $endOfGameMessage.text(`Player 1 had a higher card value and wins this round thanks to the Baron's influence!`)
        $drawDeck.unbind()
        givePlayerTokenOfAffection()
        $restartButton.css('display', 'block')
        lastCardPlayed = "Baron"
    } else if (opponentCard1.value > playerCard1.value) {
        console.log('player 1 baron wins - test')
        $endOfGameMessage.text(`Your opponent had a higher card value and wins this round thanks to the Baron's influence!`)
        $drawDeck.unbind()
        giveOpponentTokenOfAffection()
        $restartButton.css('display', 'block')
        lastCardPlayed = "Baron"
    }     
}

// Not in MVP
// Prevents the user of the handmaid card from being targeted by an opponent's card effect until the start of their next turn
// Have a beginning of turn function which will remove the handmaid effect if one is on for the currentPlayer
function handmaidEffect() {

}

// Force a player to discard their current card and draw a new one
// If there are no cards left in the deck, then the player who must draw a card loses, as they have no value to compare for the win
function princeEffect() {
    $princeEffectModal.css('display', 'block')
}

// Listeners specifically for the prince effect function, only declared once at start of game for us in the princeEffect()
// Will select yourself to discard your current card, immediately drawing from the draw pile, if any cards are left
$princeDiscardPlayer1Card.click(function() {
    if(playerCard1.name === "Princess" || playerCard2.name === "Princess") {
        $endOfGameMessage.text('Princess was discarded, opponent wins.')
        player1.currentPlayer = false
        $restartButton.css('display', 'block')
        giveOpponentTokenOfAffection()
    } else if(deck.length > 1) {
        discardCard(playerCard1)
        drawPlayerCard1()
    } else if(deck.length === 1) {
        discardCard(playerCard1)
        drawPlayerCard1()
    } else {
        $playerCard1Image.attr('src', '/images/cardback.png')
        $endOfGameMessage.text(`You could not draw from the deck, so your opponent wins a token of affection!`)
        playerCard1 = {}
        playerCard2 = {}
        giveOpponentTokenOfAffection()
        $restartButton.css('display', 'block')
    }
    checkForEmptyDeckWin()
    $princeEffectModal.css('display', 'none')
})
// Will select your opponent to discard your current card, immediately drawing from the draw pile, if any cards are left
$princeDiscardOpponentCard.click(function() {
    if(opponentCard1.name === "Princess") {
        $supplementalEndOfGameMessage.text('Princess was discarded by opponent, player wins.')
        player1.currentPlayer = false
        $restartButton.css('display', 'block')
        givePlayerTokenOfAffection()
    } else if (deck.length > 1) {
        discardOpponentCard(opponentCard1)
        drawOpponentCard1()
    } else if(deck.length === 1) {
        discardOpponentCard(opponentCard1)
        drawOpponentCard1()
    } else {
        // discardCard(opponentCard1)
        $opponentCard1Image.attr('src', '/images/cardback.png')
        $supplementalEndOfGameMessage.text(`Your opponent could not draw from the deck, so you win a token of affection!`)
        $princeEffectModal.css('display', 'none')
        $restartButton.css('display', 'block')
        givePlayerTokenOfAffection()
    }    
    checkForEmptyDeckWin()
    $princeEffectModal.css('display', 'none')
})

// This trades your card with the opponents' card
function kingEffect() {
    if (playerCard2.name === "King") {
        let tempCard = opponentCard1
        opponentCard1 = playerCard1
        playerCard1 = tempCard
        console.log(playerCard1)
        $opponentCard1Image.attr('src', opponentCard1.image)
        $playerCard1Image.attr('src', tempCard.image)
    } else if( playerCard1.name === "King") {
        let tempCard = opponentCard1
        opponentCard1 = playerCard2
        playerCard2 = tempCard
        console.log(playerCard1)
        $opponentCard1Image.attr('src', opponentCard1.image)
        $playerCard1Image.attr('src', tempCard.image)
    }
}


// If the princess is discarded, the opponent wins.
function princessEffect() {
    console.log('if princess is discarded, you lose the game')
    if(playerCard1.name === "Princess" || playerCard2.name === "Princess") {
        $endOfGameMessage.text('Princess was discarded, opponent wins.')
        player1.currentPlayer = false
        $restartButton.css('display', 'block')
        giveOpponentTokenOfAffection()
    } else if(opponentCard1.name === "Princess") {
        $endOfGameMessage.text('Princess was discarded by opponent, player wins.')
        player1.currentPlayer = false
        $restartButton.css('display', 'block')
        givePlayerTokenOfAffection()
    }
} 

// Give the player a token of affection, based off of the card's effects
function givePlayerTokenOfAffection() {
    $removedCard.text(`The removed card was: ${removedCard.name}`)
    $removedCardImage.css('background-image', `url(${removedCard.image})`)
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
    $removedCard.text(`The removed card was: ${removedCard.name}`)
    $removedCardImage.css('background-image', `url(${removedCard.image})`)
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
    if (deck.length === 0 && player1.currentPlayer) {
        if (playerCard1.value > opponentCard1.value && player1.currentPlayer) {
            givePlayerTokenOfAffection()
        } else if (opponentCard1.value > playerCard1.value && player1.currentPlayer) {
            giveOpponentTokenOfAffection()
        } else if ((playerCard1.value === opponentCard1.value && player1.currentPlayer)) {
            $endOfGameMessage.text('No one wins a token of affection from the Princess. You bore her.')
        }
        $restartButton.css('display', 'block')
        $removedCard.text(`The removed card was: ${removedCard.name}`)
        $removedCardImage.css('background-image', `url(${removedCard.image})`)
    }
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
    discardedGuards = 0
    discardedPriests = 0
    discardedBarons = 0
    discardedHandmaids = 0
    discardedPrinces = 0
    discardedKing = 0
    discardedCountess = 0
    discardedPrincess = 0
    $discardedGuards.text(`${discardedGuards}`)
    $discardedPriests.text(`${discardedPriests}`)
    $discardedBarons.text(`${discardedBarons}`)
    $discardedHandmaids.text(`${discardedHandmaids}`)
    $discardedPrinces.text(`${discardedPrinces}`)
    $discardedKing.text(`${discardedKing}`)
    $discardedCountess.text(`${discardedCountess}`)
    $discardedPrincess.text(`${discardedPrincess}`)
}

// Stretch Goals
//     Confirmation of card to discard each turn
//     Confirmation of Guard Guess choice
//     Check to see if all of one card has been played already, removing the option of that card to be guessed with a Guard Guess
//     Create a pop-up modal for the guard guess that only appears when the guard is discarded, asking for your selection
//     Play against yourself with two active hands
//     Play against an AI who makes basic decisions (as simple as possible, with very few AI logic rules)
//     Priest - Reveal the opponent's dummy card for 5 seconds
//     Handmaid - Player is untargetable by opponents' card effects until next turn (stretch goal with two players)
//          Guard, Priest, Baron, Prince, King have no effect while Handmaid is active