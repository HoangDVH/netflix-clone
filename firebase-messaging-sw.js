// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyARFsTVqszrVAxW_S4QkI5jNcPPEGXDgNg",
    authDomain: "netflix-clone-bfa92.firebaseapp.com",
    projectId: "netflix-clone-bfa92",
    storageBucket: "netflix-clone-bfa92.appspot.com",
    messagingSenderId: "57449430426",
    appId: "1:57449430426:web:94d43e0ef9c58d397ece23",
    measurementId: "G-7EVCZRSL5B",
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
