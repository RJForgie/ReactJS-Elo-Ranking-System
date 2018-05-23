import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, rating) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rating,
  });

export const doCreateGame = (winnerID, loserID, blah, result, date) =>
  db.ref(`games/`).push({
    winnerID: winnerID,
    loserID: loserID,
    rando: blah,
    gameresult: result,
    date: date,
  });

export const onceGetUser = (id) =>
  db.ref(`users/${id}`).once('value')

export const onceGetUsers = () =>
  db.ref('users').once('value');
  
export const onceGetGames = () =>
  db.ref('games').once('value');