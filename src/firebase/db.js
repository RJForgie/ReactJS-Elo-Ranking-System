import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, rating) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rating,
  });

export const doCreateGame = (date, result) =>
  db.ref('games/').push().set({
    gameDate: date,
    gameResult: result,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');
  
export const onceGetGames = () =>
  db.ref('games').once('value');