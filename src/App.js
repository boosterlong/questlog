import './App.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addEntry, addQuestToArray, signOutReload } from './helpers/firebaseFunctions';
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './helpers/firebaseConfig';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginForm } from './components/loginForm';
import { QuestCard } from './components/questCard';


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
let uid = null;

function App() {
  const [questName, setQuestName] = useState('');
  const [questDesc, setQuestDesc] = useState('');
  const [questCompletion, setQuestCompletion] = useState(0);
  const [questCompleted, setQuestCompleted] = useState(false);

  function assembleData(questName, questDesc, questCompletion, questCompleted, uid) {
    const questData = new QuestCard(questName, questDesc, questCompletion, questCompleted, uid);
    const hackyFireBaseDataStructuring = JSON.parse(JSON.stringify(questData));
    console.log(hackyFireBaseDataStructuring);
    addEntry(db, hackyFireBaseDataStructuring, uid);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    } else {
      console.log("User is signed out.")
    }
  });

  return (
    <div className="App">
      <div>Add a quest:</div>
      <input
        placeholder='Name'
        onInput={e => setQuestName(e.target.value)}></input>
      <br />
      <input
        placeholder='Description'
        onInput={e => setQuestDesc(e.target.value)}></input>
      <br />
      <input
        placeholder='Completion'
        type="number"
        onInput={e => setQuestCompletion(e.target.value)}></input>
      <br />
      <input
        placeholder='True or False'
        onInput={e => setQuestCompleted(e.target.value)}></input>
      <br />
      <button
        onClick={() => assembleData(questName, questDesc, questCompletion, questCompleted, uid)}>Button</button>
      <br /><br />
      <LoginForm props={auth} />
      <br />
      <br />
      <button
        onClick={() => signOutReload(auth)}
      >SignOut
      </button>
      <button
        onClick={() => addQuestToArray(db, {questName, questDesc, questCompletion, questCompleted, uid}, uid)}
      >Transact
      </button>
      <button onClick={() => console.log(uid)}>Log UID</button>
    </div>
  );
}

export default App;
