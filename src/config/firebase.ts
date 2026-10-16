import {initializeApp, getApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuNp0Z4b2zm2EpOU--UbRKnkLzZsvF69U",
  authDomain: "learntv-9ad49.firebaseapp.com",
  projectId: "learntv-9ad49",
  storageBucket: "learntv-9ad49.firebasestorage.app",
  messagingSenderId: "932477977227",
  appId: "1:932477977227:web:bbe5d253c3b651f6008a8e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
