// pseudo code
// Click the start game button to enable the game to be played


// Get the objects from the DOM for the general game rules modal
const $generalRulesOpenButton = $('#open-general-rules-modal');
const $generalRulesModal = $('#general-rules-modal');
const $generalRulesCloseButton = $('#general-rules-close')
// Get the objects from the DOM for the card game rules modal
const $cardRulesOpenButton = $('#open-card-rules-modal')
const $cardRulesModal = $('#card-rules-modal');
const $cardRulesCloseButton = $('#card-rules-close')

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





// Objects for the cards, with values, image, rules, number in deck, and name assigned
// Deck object for all of the cards to be contained within
// Player objects for their current card, drawn card, current player, and points
// Populate the deck with the correct cards (values and numbers for each value)
// Randomly remove one card and keep it face down (not used this game)
// Draw one card for the player (assign a dummy card to the opponent at first)
// Ensure that all parts of the card are displayed and showing properly
// Test for all cards and values (name, value, rules description, (picture)?))
// Draw a card from the deck, adding it to the player's hand and ensure that card has everything viewable on it, alongside the first card
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

