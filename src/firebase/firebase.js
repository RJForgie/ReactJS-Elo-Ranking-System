
import * as firebase from 'firebase';
import devConfig from './devConfig';
import prodConfig from './prodConfig';

  const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();

export {
  auth,
};
