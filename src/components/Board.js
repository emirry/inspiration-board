import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const cards = CARD_DATA.cards
const API_URL = "https://inspiration-board.herokuapp.com/boards/"

const Board = ({boardName}) => {
  const [cardlist, setCardList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const cardComponent = cards.map((card, i) => {
    return (
        <Card
        key={i}
        text={card.text}
        emoji={card.emoji}
    />
    )
  })

  useEffect(() => {
    axios.get(`${API_URL}/${boardName}`)
    .then((response) => {
      const apiCardList = response.data
      setCardList(apiCardList);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      console.log(error.message);
    })
  }, [boardName]);

  const updateBoard = (updatedBoard) => {
    const cards = [];

    cardlist.forEach((card) => {
      if (card.text === updatedBoard.text) {
        cards.push(updatedBoard)
      }
      else 
      cards.push(card)
    });
    
    setCardList(cards);
  };

  const addCard = (card) => {
    axios.post(`${API_URL}/${boardName}`, card)
      .then((response) => {
        const updatedBoard = [...cardlist, response.data]
        setCardList(updatedBoard);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <div>
      Board
      {errorMessage ? <div className='error-msg'>{errorMessage}</div> : ''}
      {cardComponent}
    </div>
  )
};

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(
    {
      text: PropTypes.string,
      emoji: PropTypes.string,
    },
  )),

};

export default Board;
