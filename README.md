# Love Letter

## Project Description
Browser-based recreation of the card-game Love Letter.  The goal of the game is to either eliminate the other player or to have the highest-valued card when there are no more cards to draw from the deck.  See rules section below for specific information regarding the rules.

## Planning Process
Create simple structure of HTML elements with basic CSS elements/styling. Create array of objects of cards with basic information (value, name, rule text).  Create deck based on card objects.  Ensure deck has correct number of card values and total cards.  Instantiate player objects (current card, drawn card, active player's turn, total points, more as necessary).  Query DOM elements.  Ensure players are able to interact with DOM elements as needed (draw card from deck, see rules, see card values and rules sections).   Implement turn structure (draw, discard, card effect takes place).  Implement card rules with a dummy opponent.  Implement round end scenarios and point calculations.  Implement card rules with two players (both controlled by the user for now).  Stretch - simple AI for card selection for AI-controlled opponent.

## Game Screens
### Start Screen
![image](https://user-images.githubusercontent.com/89223981/163021814-9afd174e-ec64-4ea4-9068-4fd3b46a7660.png)
### Game Board
![image](https://user-images.githubusercontent.com/89223981/163021906-88d1262d-f0ee-4a5f-9c02-9128f17fe68f.png)
### General Game Rules Modal
![image](https://user-images.githubusercontent.com/89223981/163022011-cf84bec8-6989-4f2e-bd43-49d39fce4d4b.png)
### Card-Specific Rules Modal
![image](https://user-images.githubusercontent.com/89223981/163022081-035a844b-68d5-4184-8528-a6b8a0acbbd3.png)
### Guard Guess Modal
![image](https://user-images.githubusercontent.com/89223981/163022203-20671e7c-66ab-4f5f-a21a-c90e3d4000ad.png)
### Prince Discard Select Modal
![image](https://user-images.githubusercontent.com/89223981/163022248-2a2fd6ba-ace4-49b1-81a6-be4dec637a2f.png)
### End-game State
![image](https://user-images.githubusercontent.com/89223981/163022459-3debad32-702c-4405-b4f3-f36127207904.png)


## User Stories
### As a user:
- I want to be able to interact with and read the rules of the game (modal or pop-in)
- I want to be able to interact with and read the values and rules of the card (modal or pop-in)
- I want to be able to see the cards that have already been played from both players
- I want to be able to draw a card and see both of my cards easily.
- I want to be able to select a card to discard and have the rules of that card take effect.
- I want to have a confirmation of which card I want to discard (just in case).
- I want to understand clearly that the round has ended and why it has ended.
- I want to clearly see how many points that both I and my opponent have.  
- I want to know how many cards are left in the deck.
- I want to see the card that was removed from the game when a round ends.

## MVP Goals
### As a user (against a dummy):
- I want to be able to interact with and read the rules of the game (modal or pop-in).
- I want to be able to interact with and read the values and rules of the card (modal or pop-in).
- I want to be able to see the cards that have already been played from both players.
- I want to be able to draw a card and see both of my cards easily.
- I want to be able to select a card to discard and have the rules of that card take effect.
- I want to understand clearly that the round has ended and why it has ended.
- I want to know how many cards are left in the deck.
- I want to see the card that was removed from the game when a round ends.

## Stretch Goals
### As a user:
- I want to have a confirmation of which card I want to discard (just in case).
- I want to have a confirmation of my Guard Guess choice.
- I want to have a check to see if all of one card has been played, to remove it from the Guard Guess as an option (ex, can't choose Priest if both have already been played and are seen on the board).
- I want to have two hands that I can play against myself (not a dummy opponent).
- I want to have a simple AI that can select cards to play based on card rules.

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
