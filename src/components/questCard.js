import React from "react";

export function QuestCard(props) {

  return (
    <div
      className="
        rounded-lg
        border
        border-black
        w-full
        p-3
        bg-white
        flex flex-col space-between"
    >
      <h3 className="text-2xl">{props.questInfo.questName}</h3>
      <p className="py-3 text-left">{props.questInfo.questDesc}</p>
      <h3>Completion: {props.questInfo.questCompletion}%</h3>
      <h3>Quest {props.questInfo.questCompleted ? 'Complete' : 'In Progress'}</h3>
    </div>
  )
}