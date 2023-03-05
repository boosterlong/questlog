import React, { useState } from "react";
import TrashIcon from "./icons/trash"
import EditIcon from "./icons/edit"
import { removeQuestFromArray, editQuestInArray } from "../helpers/firebaseFunctions";
import { EditQuestForm } from "./editQuestForm";

export function QuestCard(props) {
  const [editForm, setEditForm] = useState(null)
  const [editMode, setEditMode] = useState('')

  const toggleButton = (
    <button
      onClick={() => toggleForm()}
      className="text-black"><EditIcon />
    </button>
  )

  function toggleForm() {
    let questForm = (
      <>
        <EditQuestForm questName={props.questInfo.questName} questDesc={props.questInfo.questDesc} questCompletion={props.questInfo.questCompletion} questionCompleted={props.questInfo.QuestCompleted} index={props.index} uid={props.uid} />
        <button onClick={() => cancelEdit()}>Cancel</button>
      </>
    )
    editForm ? setEditForm(null) : setEditForm(questForm);
    editForm ? setEditMode('') : setEditMode('hidden');
  }

  function cancelEdit() {
    setEditMode('');
    setEditForm(null)
  }

  return (
    <div
      className="
        border-4
        border-white
        text-white
        drop-shadow-md
        rounded-lg
        w-full
        h-full
        p-3
        bg-backdrop"
    >
      <div className={`h-full flex flex-col space-between ${editMode}`}>
        <h3 className="text-3xl">{props.questInfo.questName}</h3>
        <p className="text-xl py-3 text-left flex-grow whitespace-pre-wrap">{props.questInfo.questDesc}</p>
        <h3>Completion: {props.questInfo.questCompletion}%</h3>
        <h3>Quest {props.questInfo.questCompleted ? 'Complete' : 'In Progress'}</h3>
        <div className="text-right">
        {!props.viewOnly && toggleButton}
        { !props.viewOnly && <button
          onClick={() => removeQuestFromArray(props.db, props.uid, props.index)}
          className="text-red-600"><TrashIcon />
        </button>}
        </div>
      </div>
      {editForm}
    </div>
  )
}