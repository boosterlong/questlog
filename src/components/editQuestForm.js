import React from "react";
import { useState } from "react";
import { QuestInfo, questInfoToFirestore } from '../objects/questInfo';
import { editQuestInArray } from '../helpers/firebaseFunctions';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../helpers/firebaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function EditQuestForm(props) {
    const [questName, setQuestName] = useState(props.questName);
    const [questDesc, setQuestDesc] = useState(props.questDesc);
    const [questCompletion, setQuestCompletion] = useState(props.questCompletion);
  
    function assembleData(questName, questDesc, questCompletion, questCompleted, uid) {
      if (questName == false || questDesc == false || questCompletion == false || uid == false) {
        alert("Cannot leave fields empty")
      } else {
        const questData = new QuestInfo(questName, questDesc, questCompletion, questCompleted, uid);
        const submittableData = questInfoToFirestore(questData)
        console.log(submittableData, props.index, props.uid)
        editQuestInArray(db, props.uid, props.index, submittableData)
      }
    }

  return (
    <div className="text-black">
      <input
        className="border border-grey rounded-sm p-1 my-1 w-full"
        placeholder='Name'
        defaultValue={questName}
        onInput={e => setQuestName(e.target.value)}></input>
      <textarea
        className="border border-grey rounded-sm p-1 my-1 h-40 w-full"
        placeholder='Description'
        defaultValue={questDesc}
        onInput={e => setQuestDesc(e.target.value)}></textarea>
      <input
        className="border border-grey rounded-sm p-1 my-1 w-full"
        placeholder='Completion'
        type="number"
        defaultValue={questCompletion}
        onInput={e => setQuestCompletion(e.target.value)}></input>
      <button
        className="rounded-full bg-blue-500 p-2 text-white mt-2 w-full"
        onClick={() => assembleData(questName, questDesc, questCompletion, props.uid)}>Submit</button>
    </div>
  )
}