import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, rating) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    rating,
  });

export const doCreateGame = (id, date, result) =>
  db.ref(`games/${id}`).set({
    date,
    result,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');
  
export const onceGetGames = () =>
  db.ref('games').once('value');