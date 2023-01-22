import React from "react";
import { useState } from "react";
import { QuestInfo, questInfoToFirestore } from '../objects/questInfo';
import { addQuestToArray } from '../helpers/firebaseFunctions';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../helpers/firebaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function QuestForm(props) {
    const [questName, setQuestName] = useState('');
    const [questDesc, setQuestDesc] = useState('');
    const [questCompletion, setQuestCompletion] = useState(0);
    const [questCompleted, setQuestCompleted] = useState(false);
  
    function assembleData(questName, questDesc, questCompletion, questCompleted, uid) {
      const questData = new QuestInfo(questName, questDesc, questCompletion, questCompleted, uid);
      const submittableData = questInfoToFirestore(questData)
      addQuestToArray(db, submittableData, props.uid)
    }

  return (
    <div className="bg-white w-fit mx-auto my-3 rounded-lg p-3">
      <div>Add a quest:</div>
      <input
        className="border border-grey rounded-sm p-1 m-1"
        placeholder='Name'
        onInput={e => setQuestName(e.target.value)}></input>
      <br />
      <input
        className="border border-grey rounded-sm p-1 m-1"
        placeholder='Description'
        onInput={e => setQuestDesc(e.target.value)}></input>
      <br />
      <input
        className="border border-grey rounded-sm p-1 m-1"
        placeholder='Completion'
        type="number"
        onInput={e => setQuestCompletion(e.target.value)}></input>
      <br />
      <input
        className="border border-grey rounded-sm p-1 m-1"
        placeholder='True or False'
        onInput={e => setQuestCompleted(e.target.value)}></input>
      <br />
      <button
        onClick={() => assembleData(questName, questDesc, questCompletion, questCompleted, props.uid)}>Submit</button>
    </div>
  )
}