# Love Letter

## Project Description
Browser-based recreation of the card-game Love Letter.  The goal of the game is to either eliminate the other player or to have the highest-valued card when there are no more cards to draw from the deck.  See rules section below for specific information regarding the rules.

## Planning Process
Create simple structure of HTML elements with basic CSS elements/styling. Create array of objects of cards with basic information (value, name, rule text).  Create deck based on card objects.  Ensure deck has correct number of card values and total cards.  Instantiate player objects (current card, drawn card, active player's turn, total points, more as necessary).  Query DOM elements.  Ensure players are able to interact with DOM elements as needed (draw card from deck, see rules, see card values and rules sections).   Implement turn structure (draw, discard, card effect takes place).  Implement card rules with a dummy opponent.  Implement round end scenarios and point calculations.  Implement card rules with two players (both controlled by the user for now).  Stretch - simple AI for card selection for AI-controlled opponent.

Previous wireframes can be seen here https://github.com/SaidNivek/Kevin-Dias---Love-Letter/blob/main/proposal.md

## User Stories
### As a user:
- I want to be able to interact with and read the rules of the game (modal)
- I want to be able to interact with and read the values and rules of the cards (modal)
- I want to be able to see the cards that have already been played from both players
- I want to be able to draw a card and see both of my cards easily
- I want to be able to select a card to discard and have the rules of that card take effect
- I want to understand clearly that the round has ended and why it has ended
- I want to clearly see how many points that both I and my opponent have  
- I want to know how many cards are left in the deck
- I want to see the card that was removed from the game when a round ends

## MVP Goals
### As a user (against a dummy):
- I want to be able to interact with and read the rules of the game (modal)
- I want to be able to interact with and read the values and rules of the cards (modal)
- I want to be able to see the cards that have already been played from both players
- I want to be able to draw a card and see both of my cards easily
- I want to be able to select a card to discard and have the rules of that card take effect
- I want to understand clearly that the round has ended and why it has ended
- I want to know how many cards are left in the deck
- I want to see the card that was removed from the game when a round ends
- All rules except Priest and Handmaid implemented, which require an opponent to be effective/helpful

## Stretch Goals
### As a user:
- I want to have a confirmation of which card I want to discard (just in case)
- I want to have a confirmation of my Guard Guess choice
- I want to have two hands that I can play against myself (not a dummy opponent)
- I want to have a simple AI that can select cards to play based on card rules

# Love Letter - MVP
## MVP Project Description
The goal of the game is to draw and discard cards from the draw deck to win tokens of affection from the Princess.  Each card value (from 1-8), has a different effect when discarded, which allows for a lot of replayability.  The MVP does not play against an opponent, but draws a single card for checking the code and QA purposes.  Additionally, the Priest and Handmaid cards do not have any effect at this time, as they require a true opponent to have an effect.
### Technologies Used
This project used HTML, CSS, JavaScript, and some JQuery.

## Layout
### Start Screen
The start screen has the background of the game, which is light on story.  The Play button will begin the game.  The two rules buttons in the top-right corner will display pop-ups of the rules.  The General Game Rules button will display a modal that has the rules and goals of the game itself.  The Card-Specific Rules button will display a modal that has the rules that pertain to the specific cards, with slightly more detail than that of the cards themselves.
![image](https://user-images.githubusercontent.com/89223981/163021814-9afd174e-ec64-4ea4-9068-4fd3b46a7660.png)

### Game Board
The Game Board has several pieces.
- Section 1 - The user will click on the top deck to draw, if they have only 1 card in hand.  The bottom card in this section represents the randomly removed card, which causes some amount of randomness to occur within each game.
- Section 2 - This is the user's play area.  The left-most card is the player's first card.  When they draw from the deck, they will have two cards in hand (see 2nd image below).  The user will be able to click on one of these cards to discard it and have that card's rule take effect.  The Player Wins section will hold tokens of affection (hearts).  When one player reaches 3 hearts, they win the overall game.
- Section 3 - The opponent's section is the same as the Player's, but smaller.  The opponent will not play any cards in this MVP.
- Section 4 - The 3 cards that are discarded at the start of the game are tallied here.  As cards are discarded, the total number discarded will be updated.  This is useful to be able to interact more effectively with certain card rule effects and may help to strategize/win the game.
![image](https://user-images.githubusercontent.com/89223981/163026556-96c137dc-941c-478b-84c0-c28d4eb6fc6c.png)
![image](https://user-images.githubusercontent.com/89223981/163027058-bfeaf5b7-503a-4cb9-b851-d51431f89999.png)

### General Game Rules Modal
This modal describes the general rules of the game.
![image](https://user-images.githubusercontent.com/89223981/163022011-cf84bec8-6989-4f2e-bd43-49d39fce4d4b.png)
### Card-Specific Rules Modal
This modal describes the card-specific rules of the game.
![image](https://user-images.githubusercontent.com/89223981/163022081-035a844b-68d5-4184-8528-a6b8a0acbbd3.png)
### Guard Guess Modal
This modal will appear when a Duard is discarded.  The player will need to guess one non-Guard card by clicking on one of the buttons.  If the opponent currently has the guessed card, the opponent is removed from the round.  If the guess is incorrect, play resumes as normal.  The modal will disappear when a choice is selected.
![image](https://user-images.githubusercontent.com/89223981/163022203-20671e7c-66ab-4f5f-a21a-c90e3d4000ad.png)
### Prince Discard Select Modal
This modal will appear when a Prince is discarded.  The player will need to select one player to discard a card by clicking on one of the buttons.  The player who discarded their card must immediately draw a new card.  If the Princess is discarded this way, the discarding player is removed from the round.  If there are no cards left in the deck when a player discards, then that player is out of the round, since they cannot compare nothing to the value of other players' cards.
![image](https://user-images.githubusercontent.com/89223981/163022248-2a2fd6ba-ace4-49b1-81a6-be4dec637a2f.png)
### End-game State
The game is over when one player wins 3 tokens of affection (hearts) from the Princess.  A new game may be triggered by clicking the button at this stage, resetting the round wins back to 0 for all players.
![image](https://user-images.githubusercontent.com/89223981/163022459-3debad32-702c-4405-b4f3-f36127207904.png)

## Installation Instructions
To play this game, please follow the below link to play it in your browser:
https://saidnivek.github.io/KEVIN-DIAS---LOVE-LETTER/

## Unsolved Problems
- The removed card has some strange issues with being clipped, not resizing down to a smaller height/width when revealed at the end of the game.  
- I tried to implement some card flip animations/draw card animations/discard card animations, but was having issues effectively placing them on the screen (they would either not work or go careening into the abyss).
- Discarding a card with the Prince and then drawing a new card immediately is not noticeble if the discarded card and the newly drawn card are the same, as there is no delay between discarding and drawing, which may cause confusion.

## Major Hurdles
- The Countess card rules were difficult, as she is the only card that needs a check to happen before being discarded.  Currently, the solution is not ideal, but works as intended.
- The Prince/Guard rules were difficult, as they require different rules based on whether there are 0, 1, or more cards in the deck to prevent the standard game rules from taking place, which would cause multiple wins to be awarded to one game, which is not an intended mechanic.

## Future Goals & Implementation
- I want to have a confirmation of which card the player wants to discard from their hand (just in case).
- I want to have a confirmation of the Guard Guess choice.
- I want to have a confirmation of the Prince discard choice.
- I would like to get animations into the game, to better emulate the feeling of drawing and discarding cards.
- I want to implement the Priest and Handmaid rules
- I would like to implement a basic computer AI to play against with the simplest possible logic for selecting/guessing/discarding cards.

## Rules
### Setup
Shuffle the 16 card deck and remove the top card from the deck without looking at it, which will not be used in this game.  In two-player games, take 3 more cards from the top of the deck and place them to the side, face up.  Each player draws one card from the deck.  Player 1 (the user) will go first.
### Taking a Turn
The current player draws the top card from the deck. Current player chooses one of the two cards in your hand and discacrds it face up.  The effect/rule on the card then takes place, with any actions being followed by the current player.  The next player will then take their turn.  Each player will only have one card in hand at a time, except while selecting which of two cards to discard on their turn.
### End of a Round
A round ends in one of two ways:
1 - Only one player remains in the round, through the use of various card rules.  The player who remains in the game is the winner of this round and receives a token of affection.
2 - The current player cannot draw a card from the deck (either at the start of their turn or through a discard effect which would require a draw).  The winner of this round is the player with the highest-valued card and receives a token of affection.  If both players have the same value, the round is a tie.
### Card Rules
#### 1 - Guard
5 Guards in deck.  Name a non-Guard card.  If the opponent has that card, they are removed from the round and you win the round.
#### 2 - Priest 
2 in deck.  Look at another player's hand (not as useful in MVP where both hands will be revealed, but for a stretch with AI it will be important for guesses)
#### 3 - Baron
2 in deck.  Compare hands with the other player.  The player with the lowar value is out of the round and you win the game.  Tied values are ignored and play resumes as normal.
#### 4 - Handmaid
2 in deck. Until your next turn, ignore all effects from other players that would effect you (cards 1, 2, 3, 5, and 6).
#### 5 - Prince
2 in deck. Choose yourself or another player to discard their hand and draw a new card.  This can force yourself to lose the game if you discard the Princess or discard and there are no cards left in the deck to draw (in which case your card value will be 0 when comparing to another player).  This can happen when the opponent is under the effect of $4, the Handmaid.
### 6 - King
1 in deck.  Trade hands with the other player.
### 7 - Countess
1 in deck. If you have the Countess and a King or a Prince in your hand, you MUST discard the Countess.  You can also choose to discard the Countess, even if you don't have a King or Prince in hand.
#### 8 - Princess
1 in deck. You are out of the round if you discard the Princess and the game ends immediately.
