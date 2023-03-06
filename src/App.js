import './App.css';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginForm } from './components/loginForm';
import { QuestForm } from './components/questForm';
import { useState } from 'react';
import { QuestGallery } from './components/questGallery';
import SignOut from './components/signOut';
import { QuestViewer } from './components/questViewer';
import { copyLink } from './helpers/copyLink';


const app = initializeApp(process.env.REACT_APP_FIREBASECONFIG);
const db = getFirestore(app);
const auth = getAuth(app);

function App() {
  let [uid, setUid] = useState(null)
  let shareLink = `http://${window.location.hostname}/?questlog=${uid}`

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let logViewer = params.questlog;

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
      { !uid && logViewer && <QuestViewer uid={logViewer} db={db} /> }
      { !uid && !logViewer &&  <LoginForm /> }
      { uid && <QuestGallery uid={uid} db={db} /> }
      { uid && <QuestForm uid={uid} /> }
      { uid && 
        <div
          onClick={() => copyLink(shareLink)}
          className="bg-white w-full mx-auto my-3 rounded-lg p-3 drop-shadow-md"
          >
          <h2>Share the Questlog with your players (click to copy):
            <p>{shareLink}</p>
          </h2>
        </div>
      }
      { uid && <SignOut auth={auth} /> }
    </div>
  );
}

export default App;
