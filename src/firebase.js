// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFyH-7uWFu4Tbqpt03c4GXoA9YGdyQR_Q',
  authDomain: 'hertech-0-0-1.firebaseapp.com',
  databaseURL:
    'https://hertech-0-0-1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'hertech-0-0-1',
  storageBucket: 'hertech-0-0-1.appspot.com',
  messagingSenderId: '673083644523',
  appId: '1:673083644523:web:1f6e355e61f78dd22faf2e',
  measurementId: 'G-N2D9DLZ7JQ',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

const analytics = getAnalytics(app)
