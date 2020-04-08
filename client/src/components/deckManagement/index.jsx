import React, { Component } from "react";
import Cards from "../cards";
import FaceDownCards from "../faceDownCards";
import allCards from "../../cards.json";
import "./style.css";

class DeckBrain extends Component {
  state = {
    playedCardsFromFour: [],
    centerCardsThatAreSameOrderLength: 0,
    topAndBottomFourCards: [],
    potentialPlay: [],
    currentCard: [],
    playArea: [],
    turnEnded: false,
    deck: [],
    hand: [],
    discard: [],
    fourCardsFaceUp: [],
    fourCardsFaceDown: [],
    fourCardsFaceUpPermanent: [],
    fourCardsFaceDownPermanent: [],
    deckRecieved: false,
    cardsRead: false,
    show: false,
    propsRecieved: false
  };

  componentDidMount() {
    let basicDeck = allCards;

    this.setState(
      {
        deck: basicDeck
      },
      () => {
        this.shuffleDeck();
      }
    );
  }

  componentDidUpdate(prevprops, prevState) {
    const turnEnded = this.state.turnEnded;
    let cardsRead = this.state.cardsRead;
    if (turnEnded) {
      // this.discardPlayed();
    }
    if (cardsRead) {
    }
  }

  shuffleDeck = () => {
    let newestDeck = this.state.deck;
    const shuffledDeck = this.shuffleCards(newestDeck);
    this.setState(
      {
        deck: shuffledDeck
      },
      () => {
        this.drawCards();
      }
    );
  };

  handlePlayedCards = playedCards => {
    let tempNewCenter = [];
    let currentLastCard = [];
    let currentUserHand = this.state.hand;
    let currentPlayedPile = playedCards;
    let currentPlayedPileforChange = playedCards;
    let currentPlayedAreaCardsLength = playedCards.length;
    currentPlayedAreaCardsLength = currentPlayedAreaCardsLength - 1;
    let cardBeforeLast = playedCards.length;
    cardBeforeLast = cardBeforeLast - 2;
    let cardbeforeLastPlayed = playedCards[cardBeforeLast];
    let lastPlayedCard = playedCards[currentPlayedAreaCardsLength];
    let currentPlayedCardValue = lastPlayedCard.order;
    let previousPlayedCardValue = cardbeforeLastPlayed.order;
    if (lastPlayedCard.order === 10) {
      console.log("clear");
      this.discardPlayed();
    } else {
      if (currentPlayedCardValue < previousPlayedCardValue) {
        console.log("Lower");
        this.setState({
          cardsRead: true,
          turnEnded: false
        });
      } else if (currentPlayedCardValue === previousPlayedCardValue) {
        let tempPlayedSameCardLength = this.state
          .centerCardsThatAreSameOrderLength;
        tempPlayedSameCardLength++;
        console.log("Same");
        this.setState({
          centerCardsThatAreSameOrderLength: tempPlayedSameCardLength,
          cardsRead: true,
          turnEnded: false
        });
      } else if (currentPlayedCardValue > previousPlayedCardValue) {
        currentLastCard.push(currentPlayedPile[currentPlayedAreaCardsLength]);

        tempNewCenter.push(currentPlayedPile[currentPlayedAreaCardsLength]);
        currentPlayedPileforChange.pop();
        for (let i = 0; i < currentPlayedPileforChange.length; i++) {
          currentUserHand.push(currentPlayedPileforChange[i]);
        }
        this.setState({
          cardsRead: true,
          turnEnded: false,
          hand: currentUserHand,
          playArea: tempNewCenter
        });
      }
    }
  };

  handlePotentialPlayedCards = potentialPlayedCards => {
    let tempPotentialPlayedCards = this.state.potentialPlay;
    let tempPotentialPlayedCardsLength = tempPotentialPlayedCards.length;
    let tempPlayArea = this.state.playArea;
    let tempPlayAreaLength = tempPlayArea.length;
    let tempLastCardPlayAreaOrder = 0
    let firstCardOfPotentialCardsOrder = tempPotentialPlayedCards[0].order;
    let tempCurrentLengthOfSameCards = this.state.centerCardsThatAreSameOrderLength;
    let newCurrentCardLength = tempCurrentLengthOfSameCards + tempPotentialPlayedCardsLength;
    let tempHand = this.state.hand;
    let tempNewPlayAreaEmpty = [];
    let tempNewPotentialCardAreaEmpty = []
if(tempPlayArea.length >= 1){
  tempLastCardPlayAreaOrder = tempPlayArea[tempPlayAreaLength - 1].order
}
    if (firstCardOfPotentialCardsOrder === 10) {
      this.clearDeckGoAgain();
    } else {
      if (firstCardOfPotentialCardsOrder < tempLastCardPlayAreaOrder) {
        if (tempPotentialPlayedCardsLength >= 4) {
          this.clearDeckGoAgain();
        } else {
          for (let i = 0; i < tempPotentialPlayedCards.length; i++) {
            tempPlayArea.push(tempPotentialPlayedCards[i]);
          }
          // tempPotentialPlayedCards.splice(0, tempPotentialPlayedCardsLength);
        this.setState({
          playArea: tempPlayArea,
          potentialPlay: tempNewPotentialCardAreaEmpty,
          centerCardsThatAreSameOrderLength: tempPotentialPlayedCardsLength,
          cardsRead: true,
          turnEnded: true
        });
      }
      } else if (firstCardOfPotentialCardsOrder ===  tempLastCardPlayAreaOrder) {
        if (newCurrentCardLength >= 4) {
          this.clearDeckGoAgain();
        } else {
          for (let i = 0; i < tempPotentialPlayedCards.length; i++) {
            tempPlayArea.push(tempPotentialPlayedCards[i]);
          }
        this.setState({
          centerCardsThatAreSameOrderLength: newCurrentCardLength,
          playArea: tempPlayArea,
          potentialPlay: tempNewPotentialCardAreaEmpty,
          cardsRead: true,
          turnEnded: true
        });
      }
      } else if (firstCardOfPotentialCardsOrder > tempLastCardPlayAreaOrder) {
          for (let j = 0; j < tempPlayArea.length; j++) {
            tempHand.push(tempPlayArea[j]);
          }
          if(tempPotentialPlayedCardsLength >= 4){
            this.clearDeckGoAgain();
          }
          else {
          for (let k = 0; k < tempPotentialPlayedCards.length; k++) {
            tempNewPlayAreaEmpty.push(tempPotentialPlayedCards[k]);
          }
          this.setState({
            hand: tempHand,
            playArea: tempNewPlayAreaEmpty,
            potentialPlay: tempNewPotentialCardAreaEmpty,
            centerCardsThatAreSameOrderLength: tempPotentialPlayedCardsLength,
            cardsRead: true,
            turnEnded: true
          });
          }
      }
    }
  };

  clearDeckGoAgain = () => {
    let tempEmptyPlayArea = [];
    let newPotentialPlayArea = []
    let tempPotentialPlay = this.state.potentialPlay
    let tempDiscard = [...this.state.discard];
    let tempPlayArea = [...this.state.playArea];
    for(let j = 0; j < tempPotentialPlay.length; j++){
      tempPlayArea.push(tempPotentialPlay[j])
    }
    for (let i = 0; i < tempPlayArea.length; i++) {
      tempDiscard.push(tempPlayArea[i]);
    }

    this.setState({
      discard: tempDiscard,
      playArea: tempEmptyPlayArea,
      potentialPlay: newPotentialPlayArea
    });
  };

  toPlay = index => {
    if (this.state.playArea.length < 52) {
      // console.log(this.state.hand);

      let card = this.state.hand[index];
      let tempHand = this.state.hand;
      let tempPlay = this.state.playArea;
      tempPlay.push(card);
      tempHand.splice(index, 1);

      this.setState(
        {
          hand: tempHand,
          playArea: tempPlay
        },
        () => {
          this.setState({
            turnEnded: true
          });
          this.handlePlayedCards(this.state.playArea);
        }
      );
    } else {
      alert("exceeded play limit");
    }
  };

  toHand = index => {
    if (this.state.playArea.length < 52) {
      // console.log(this.state.hand);

      let card = this.state.potentialPlay[index];
      let tempHand = this.state.hand;
      let tempPotentialPlay = this.state.potentialPlay;
      tempHand.push(card);
      tempPotentialPlay.splice(index, 1);

      this.setState({
        hand: tempHand,
        potentialPlay: tempPotentialPlay
      });
    } else {
      alert("exceeded play limit");
    }
  };

  toEndTurn = () => {
    if (this.state.potentialPlay.length >= 1) {
      // console.log(this.state.hand);

      let tempPotentialPlay = this.state.potentialPlay;

      let tempCenter = this.state.playArea;
      for (let i = 0; i < tempPotentialPlay.length; i++) {
        tempCenter.push(tempPotentialPlay[i]);
      }

      this.setState(
        {
          playArea: tempCenter
        },
        () => {
          this.setState({
            turnEnded: true
          });
          this.handlePotentialPlayedCards(this.state.potentialPlay);
        }
      );
    } else {
      alert("Click a card!");
    }
  };

  toPotentialPlayFromFaceUp = index => {
    if (this.state.potentialPlay.length < 52) {
      // console.log(this.state.hand);

      let card = this.state.fourCardsFaceUp[index];
      let tempFourCardsFaceUp = this.state.fourCardsFaceUp;
      let tempPotentialPlay = this.state.potentialPlay;
      if (
        tempPotentialPlay.length >= 1 &&
        tempPotentialPlay[0].order === card.order
      ) {
        tempPotentialPlay.push(card);
        tempFourCardsFaceUp.splice(index, 1);
      } else if (tempPotentialPlay.length === 0) {
        tempPotentialPlay.push(card);
        tempFourCardsFaceUp.splice(index, 1);
      }
      this.setState({
        fourCardsFaceUp: tempFourCardsFaceUp,
        potentialPlay: tempPotentialPlay
      });
    } else {
      alert("exceeded play limit");
    }
  };

  toPotentialPlay = index => {
    if (this.state.potentialPlay.length < 52) {
      // console.log(this.state.hand);

      let card = this.state.hand[index];
      let tempHand = this.state.hand;
      let tempPotentialPlay = this.state.potentialPlay;
      if (
        tempPotentialPlay.length >= 1 &&
        tempPotentialPlay[0].order === card.order
      ) {
        tempPotentialPlay.push(card);
        tempHand.splice(index, 1);
      } else if (tempPotentialPlay.length === 0) {
        tempPotentialPlay.push(card);
        tempHand.splice(index, 1);
      }

      this.setState({
        hand: tempHand,
        potentialPlay: tempPotentialPlay
      });
    } else {
      alert("exceeded play limit");
    }
  };

  backToHandOrFaceUp = async index => {
    let tempPotentialPlay = this.state.potentialPlay;
    let card = this.state.potentialPlay[index];
    let tempHand = this.state.hand;
    let tempFourFaceUp = this.state.fourCardsFaceUp;
    let tempFourFaceUpPermanent = this.state.fourCardsFaceUpPermanent;
    let containsFaceCard = false;
    for (let i = 0; i < tempFourFaceUpPermanent.length; i++) {
      if (tempFourFaceUpPermanent[i].id === card.id) {
        containsFaceCard = true;
      }
    }
    if (containsFaceCard === false) {
      tempHand.push(card);
      tempPotentialPlay.splice(index, 1);
    } else if (containsFaceCard === true) {
      tempFourFaceUp.push(card);
      tempPotentialPlay.splice(index, 1);
    }

    this.setState({
      hand: tempHand,
      potentialPlay: tempPotentialPlay,
      fourCardsFaceUp: tempFourFaceUp
    });
    return containsFaceCard;
  };

  toPlayFromFaceUp = index => {
    if (this.state.playArea.length < 52) {
      let tempFaceDownCards = [...this.state.fourCardsFaceDown];
      let card = this.state.fourCardsFaceUp[index];
      let replacementCard = tempFaceDownCards[index];
      let tempFourFaceUp = this.state.fourCardsFaceUp;
      let tempPlay = this.state.playArea;
      tempPlay.push(card);
      tempFourFaceUp.splice(index, 1);
      // tempFaceDownCards.splice(index, 1)

      let tempTopAndBottom = this.state.topAndBottomFourCards;
      console.log("Here");
      console.log(tempTopAndBottom[0].bottom);

      let playedCard = {
        id: card.id,
        value: card.value,
        order: card.order,
        index: index
      };
      let tempPlayedCard = [];
      tempPlayedCard.push(playedCard);

      this.setState(
        {
          playedCardsFromFour: tempPlayedCard,
          fourCardsFaceUp: tempFourFaceUp,
          fourCardsFaceDown: tempFaceDownCards
        },
        () => {
          this.setState({
            turnEnded: true
          });
          this.handlePlayedCards(this.state.playArea);
        }
      );
    } else {
      alert("exceeded play limit");
    }
  };
  toPlayFromFaceDown = index => {
    if (this.state.playArea.length < 52) {
      // console.log(this.state.hand);

      let card = this.state.fourCardsFaceDown[index];
      let tempFourFaceDown = this.state.fourCardsFaceDown;
      let tempPlay = this.state.playArea;
      tempPlay.push(card);
      tempFourFaceDown.splice(index, 1);
      this.setState(
        {
          fourCardsFaceDown: tempFourFaceDown
        },
        () => {
          this.setState({
            turnEnded: true
          });
          this.handlePlayedCards(this.state.playArea);
        }
      );
    } else {
      alert("exceeded play limit");
    }
  };

  shuffleCards = cards => {
    let randomCardsArray = [];
    let originalCards = cards.slice(0);

    while (originalCards.length) {
      let randomNumber = Math.floor(Math.random() * originalCards.length);
      let card = originalCards.splice(randomNumber, 1)[0];
      randomCardsArray.push(card);
    }
    return randomCardsArray;
  };

  discardPlayed = () => {
    let newPlayArea = [];
    let tempDiscard = [...this.state.discard];
    let tempPlayArea = [...this.state.playArea];

    let tempPlayAreaLength = tempPlayArea.length;
    tempPlayAreaLength = tempPlayAreaLength - 1;
    let lastCard = tempPlayArea[tempPlayAreaLength];
    newPlayArea.push(lastCard);
    tempPlayArea.pop();
    let restOfCards = tempPlayArea;
    for (let i = 0; i < restOfCards.length; i++) {
      tempDiscard.push(restOfCards[i]);
    }

    this.setState({
      discard: tempDiscard,
      playArea: newPlayArea
    });
  };

  drawCards = () => {
    let tempDeck = [...this.state.deck];
    const tempHand = [...this.state.hand];
    let tempFaceDownCards = [...this.state.fourCardsFaceDown];
    let tempFaceUpCards = [...this.state.fourCardsFaceUp];
    let tempDiscard = [...this.state.discard];
    let currentAreaPlay = [...this.state.playArea];
    let tempFourCardsFaceUpPermanent = this.state.fourCardsFaceUpPermanent;

    let newCurrentCard = [];
    let combinedFour = [];
    while (tempHand.length < 11) {
      let tempCard = tempDeck.shift();
      tempHand.push(tempCard);
    }
    while (tempFaceDownCards.length < 4) {
      let tempCard = tempDeck.shift();
      tempFaceDownCards.push(tempCard);
    }
    while (tempFaceUpCards.length < 4) {
      let tempCard = tempDeck.shift();
      tempFaceUpCards.push(tempCard);
      tempFourCardsFaceUpPermanent.push(tempCard);
    }
    while (currentAreaPlay.length < 1) {
      let tempCard = tempDeck.shift();
      currentAreaPlay.push(tempCard);
      newCurrentCard.push(tempCard);
    }
    let placeOne = { top: tempFaceUpCards[0], bottom: tempFaceDownCards[0] };
    let placeTwo = { top: tempFaceUpCards[1], bottom: tempFaceDownCards[1] };
    let placeThree = { top: tempFaceUpCards[2], bottom: tempFaceDownCards[2] };
    let placeFour = { top: tempFaceUpCards[3], bottom: tempFaceDownCards[3] };
    combinedFour.push(placeOne, placeTwo, placeThree, placeFour);

    console.log("Here ");
    console.log(combinedFour);
    tempHand.sort((a, b) => (a.order > b.order ? 1 : -1));

    this.setState(
      {
        hand: tempHand,
        currentCard: newCurrentCard,
        deck: tempDeck,
        fourCardsFaceDown: tempFaceDownCards,
        fourCardsFaceUp: tempFaceUpCards,
        playArea: currentAreaPlay,
        topAndBottomFourCards: combinedFour
      },

      () => {
        this.setState({
          deckRecieved: true
        });
      }
    );
  };

  render() {
    const { deckRecieved } = this.state;
    const { turnEnded } = this.state;
    const { cardsRead } = this.state;

    if (deckRecieved && cardsRead === false) {
      // let card = this.state.currentCard
      // console.log(card)
      let hand = this.state.hand.map((card, index) => {
        return (
          <div className="in-play handCard row1 d-flex justify-content-center">
            <Cards
              key={card.id}
              cornerImage={card.cornerImage}
              corner={card.corner}
              name={card.name}
              image={card.image}
              handleClick={this.toPotentialPlay}
              currentIndex={index}
            />
          </div>
        );
      });

      let middle = this.state.playArea.map((card, index) => {
        return (
          <div className=" middle-cards">
            <Cards
              key={card.id}
              name={card.name}
              corner={card.corner}
              cornerImage={card.cornerImage}
              image={card.image}
              currentIndex={index}
            />
          </div>
        );
      });

      let newPotentialPlay = this.state.potentialPlay.map((card, index) => {
        return (
          <div className="potential-play">
            <Cards
              key={card.id}
              corner={card.corner}
              cornerImage={card.cornerImage}
              name={card.name}
              image={card.image}
              handleClick={this.backToHandOrFaceUp}
              currentIndex={index}
            />
          </div>
        );
      });

      let faceDownCards = this.state.fourCardsFaceDown.map((card, index) => {
        return (
          <div className="handCard row1 d-flex justify-content-center">
            {/* <div  className="faceDown handCard row1 d-flex justify-content-center"> */}
            <FaceDownCards
              key={card.id}
              cornerImage={card.cornerImage}
              corner={card.corner}
              name={card.name}
              image={card.image}
              handleClick={this.toPlayFromFaceDown}
              currentIndex={index}
            />
          </div>
        );
      });

      let fourCardArea = this.state.fourCardsFaceUp.map((card, index) => {
        return (
          <div className="playCard row2 d-flex justify-content-center">
            <Cards
              key={card.id}
              name={card.name}
              corner={card.corner}
              cornerImage={card.cornerImage}
              image={card.image}
              value={card.value}
              handleClick={this.toPotentialPlayFromFaceUp}
              currentIndex={index}
            />
          </div>
        );
      });

      return (
        <div id="gameArea stuffs">
          <div className="row d-flex justify-content-center"></div>

          <div className="areaPlay">{middle.length ? middle : null}</div>
          <br />
          <br />

          <br />

          <br />

          <div className="potentialPlayArea ">
            {newPotentialPlay.length ? newPotentialPlay : null}
          </div>

          <div className="submit-Button">
            <button
              className="nes-pointer buzz  endTurn neon4 mb-3 nes-btn"
              onClick={this.handlePotentialPlayedCards}
            >
              End Turn
            </button>
          </div>

          <br />
          <br />

          <br />

          <br />
          <div className="handArea ">{hand.length ? hand : null}</div>

          <div className="faceUp">
            {fourCardArea.length ? fourCardArea : null}
          </div>
          <div className="faceDown">
            {faceDownCards.length ? faceDownCards : null}
          </div>
        </div>
        // </div>
      );
    } else if (deckRecieved && cardsRead === true) {
      let hand = this.state.hand.map((card, index) => {
        return (
          <div className="in-play handCard row1 d-flex justify-content-center">
            <Cards
              key={card.id}
              name={card.name}
              corner={card.corner}
              cornerImage={card.cornerImage}
              image={card.image}
              handleClick={this.toPotentialPlay}
              currentIndex={index}
            />
          </div>
        );
      });

      let middle = this.state.playArea.map((card, index) => {
        return (
          <div className=" middle-cards">
            <Cards
              key={card.id}
              name={card.name}
              corner={card.corner}
              cornerImage={card.cornerImage}
              image={card.image}
              currentIndex={index}
            />
          </div>
        );
      });

      let newPotentialPlay = this.state.potentialPlay.map((card, index) => {
        return (
          <div className="potential-play">
            <Cards
              key={card.id}
              corner={card.corner}
              cornerImage={card.cornerImage}
              name={card.name}
              image={card.image}
              handleClick={this.backToHandOrFaceUp}
              currentIndex={index}
            />
          </div>
        );
      });

      let fourCardArea = this.state.fourCardsFaceUp.map((card, index) => {
        return (
          <div className="playCard row2 d-flex justify-content-center">
            <Cards
              key={card.id}
              corner={card.corner}
              cornerImage={card.cornerImage}
              name={card.name}
              image={card.image}
              value={card.value}
              handleClick={this.toPotentialPlayFromFaceUp}
              currentIndex={index}
            />
          </div>
        );
      });

      let faceDownCards = this.state.fourCardsFaceDown.map((card, index) => {
        return (
          <div className="handCard row1 d-flex justify-content-center">
            {/* <div className="faceDown playCard row2 d-flex justify-content-center"> */}
            <FaceDownCards
              key={card.id}
              cornerImage={card.cornerImage}
              corner={card.corner}
              name={card.name}
              image={card.image}
              handleClick={this.toPlayFromFaceDown}
              currentIndex={index}
            />
          </div>
        );
      });

      return (
        <div id="gameArea stuffs">
          <div className="row d-flex justify-content-center"></div>

          <div className="areaPlay">{middle.length ? middle : null}</div>
          <br />
          <br />

          <br />

          <br />

          <div className="potentialPlayArea ">
            {newPotentialPlay.length ? newPotentialPlay : null}
          </div>

          <div className="submit-Button">
            <button
              className="nes-pointer buzz  endTurn neon4 mb-3 nes-btn"
              onClick={this.handlePotentialPlayedCards}
            >
              End Turn
            </button>
          </div>

          <br />
          <br />

          <br />

          <br />
          <div className="handArea ">{hand.length ? hand : null}</div>

          <div className="faceUp">
            {fourCardArea.length ? fourCardArea : null}
          </div>
          <div className="faceDown">
            {faceDownCards.length ? faceDownCards : null}
          </div>
        </div>
        // </div>
      );
    } else {
      return null;
    }
  }
}

export default DeckBrain;
