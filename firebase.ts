// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken , onMessage} from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARFsTVqszrVAxW_S4QkI5jNcPPEGXDgNg",
  authDomain: "netflix-clone-bfa92.firebaseapp.com",
  projectId: "netflix-clone-bfa92",
  storageBucket: "netflix-clone-bfa92.appspot.com",
  messagingSenderId: "57449430426",
  appId: "1:57449430426:web:94d43e0ef9c58d397ece23",
  measurementId: "G-7EVCZRSL5B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BPFWjcSKQJCXBXa6x7H7q0BSPotuqVMkqzuPauxzLpeZBwXahn2JQnCE3F2e_7CS975t2G7BKxgJg5fk8U-Gosc",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
