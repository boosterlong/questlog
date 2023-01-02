export class QuestCard {
  constructor(questName, questDesc, questCompletion, questCompleted, uid) {
    (questCompleted == 'True') ? (this.questCompleted = true) : (this.questCompleted = false)
    this.questName = questName
    this.questDesc = questDesc
    this.questCompletion = questCompletion
    this.uid = uid
  }
}
