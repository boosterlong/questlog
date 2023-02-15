import './App.css';

import { initializeApp } from "firebase/app";
import { signOutReload } from './helpers/firebaseFunctions';
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './helpers/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginForm } from './components/loginForm';
import { QuestForm } from './components/questForm';
import { useState } from 'react';
import { QuestGallery } from './components/questGallery';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function App() {
  let [uid, setUid] = useState(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      console.log("User is signed out.")
    }
  });

  return (
    <div className="App max-w-[650px] mx-auto p-3">
      {/*
      !uid is logged out, uid is logged in. There's probably a better / more
      secure way to do this, but this works for now.
      */}
      { !uid && <LoginForm /> }
      { uid && <QuestGallery uid={uid} db={db} /> }
      { uid && <QuestForm uid={uid} /> }
      { uid && <button
        className="rounded-full bg-blue-500 text-white p-2"
        onClick={() => signOutReload(auth)}
      >Sign Out
      </button> }
    </div>
  );
}

export default App;
