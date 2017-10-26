const client_id: string = require('../../secrets/gauth_client_id.json');

interface Lazy<T> {
  get: () => T;
}

interface GoogleUserProfile {
  getId: () => string;
  getName: () => string;
  getImage: () => string;
  getEmail: () => string;
}

interface GoogleUser {
  getBasicProfile: () => GoogleUserProfile;
}

interface GoogleAuth2 {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  currentUser: Lazy<GoogleUser>;
  isSignedIn: Lazy<boolean>;
}


declare const GAPI_CLIENT_ID: string;

let auth2: GoogleAuth2;

const gapi = (<any>window).gapi;
gapi.load('auth2', () => {
  auth2 = gapi.auth2.init({
    client_id
  });
});

export { auth2 };
