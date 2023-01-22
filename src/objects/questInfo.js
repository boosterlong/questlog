export class QuestInfo {
  constructor(questName, questDesc, questCompletion, questCompleted) {
    (questCompleted == 'True') ? (this.questCompleted = true) : (this.questCompleted = false)
    this.questName = questName
    this.questDesc = questDesc
    this.questCompletion = questCompletion
  }
}

export function questInfoToFirestore(questInfo) {
  return ({
    questName: questInfo.questName,
    questDesc: questInfo.questDesc,
    questCompletion: questInfo.questCompletion,
    questCompleted: questInfo.questCompleted
  })
}
