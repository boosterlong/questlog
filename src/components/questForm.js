import React from "react";
import { useState } from "react";
import { QuestInfo, questInfoToFirestore } from '../objects/questInfo';
import { addQuestToArray } from '../helpers/firebaseFunctions';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(process.env.REACT_APP_FIREBASECONFIG);
const db = getFirestore(app);

export function QuestForm(props) {
    const [questName, setQuestName] = useState('');
    const [questDesc, setQuestDesc] = useState('');
    const [questCompletion, setQuestCompletion] = useState(0);
    const [questCompleted, setQuestCompleted] = useState(false);
  
    function assembleData(questName, questDesc, questCompletion, questCompleted, uid) {
      if (questName == false || questDesc == false || questCompletion == false || uid == false) {
        alert("Cannot leave fields empty")
      } else {
        const questData = new QuestInfo(questName, questDesc, questCompletion, questCompleted, uid);
        const submittableData = questInfoToFirestore(questData)
        addQuestToArray(db, submittableData, props.uid)
      }
    }

  return (
    <div className="bg-white w-full mx-auto my-3 rounded-lg p-3 drop-shadow-md">
      <details>
        <summary className="cursor-pointer">Add a Quest</summary>
        <input
          className="border border-grey rounded-sm p-1 my-1 w-full"
          placeholder='Name'
          onInput={e => setQuestName(e.target.value)}></input>
        <textarea
          className="border border-grey rounded-sm p-1 my-1 h-40 w-full"
          placeholder='Description'
          onInput={e => setQuestDesc(e.target.value)}></textarea>
        <input
          className="border border-grey rounded-sm p-1 my-1 w-full"
          placeholder='Completion'
          type="number"
          onInput={e => setQuestCompletion(e.target.value)}></input>
        <input
          className="border border-grey rounded-sm p-1 my-1 w-full"
          placeholder='Completed? True or False'
          onInput={e => setQuestCompleted(e.target.value)}></input>
        <button
          className="rounded-full bg-blue-500 p-2 text-white mt-2 w-full"
          onClick={() => assembleData(questName, questDesc, questCompletion, questCompleted, props.uid)}>Submit</button>
      </details>
    </div>
  )
}