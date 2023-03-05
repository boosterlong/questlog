import React, { useState } from "react";
import { getQuestEntries } from "../helpers/firebaseFunctions";
import { QuestCard } from "./questCard";
import LoaderSpinner from "./loaderSpinner"

export function QuestViewer(props) {
  const [questName, setQuestName] = useState(<LoaderSpinner />);
  const [questGallery, setQuestGallery] = useState(null);
  
  if (!questGallery) {
    getQuestEntries(props.db, props.uid)
    .then((data) => {
      setQuestName(`${data.name}'s Quests`)
      setQuestGallery(data.quests.map((quest, index) => <QuestCard questInfo={quest} db={props.db} index={index} uid={props.uid} key={`questCard${index}`} viewOnly={true} />))
    });
  }

  return (
    <div>
      <h1>{questName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-3">
        {questGallery}
      </div>
    </div>
  )
}