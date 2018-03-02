import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, rating) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rating,
  });

export const doCreateGame = (blah, result, date) =>
  db.ref('games/').push().set({
    rando: blah,
    gameresult: result,
    date: date,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');
  
export const onceGetGames = () =>
  db.ref('games').once('value');