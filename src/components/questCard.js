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
    editForm ? setEditForm(null) : setEditForm(<EditQuestForm questName={props.questInfo.questName} questDesc={props.questInfo.questDesc} questCompletion={props.questInfo.questCompletion} questionCompleted={props.questInfo.QuestCompleted} index={props.index} uid={props.uid} />);
    editForm ? setEditMode('') : setEditMode('hidden');
  }

  return (
    <div
      className="
        drop-shadow-md
        rounded-lg
        w-full
        h-full
        p-3
        bg-white"
    >
      <div className={`h-full flex flex-col space-between ${editMode}`}>
        <h3 className="text-2xl">{props.questInfo.questName}</h3>
        <p className="py-3 text-left flex-grow whitespace-pre-wrap">{props.questInfo.questDesc}</p>
        <h3>Completion: {props.questInfo.questCompletion}%</h3>
        <h3>Quest {props.questInfo.questCompleted ? 'Complete' : 'In Progress'}</h3>
        <div className="text-right">
        {toggleButton}
        <button
          onClick={() => removeQuestFromArray(props.db, props.uid, props.index)}
          className="text-red-600"><TrashIcon />
        </button>
        </div>
      </div>
      {editForm}
    </div>
  )
}