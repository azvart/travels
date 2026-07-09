import { QUEST_CONDITION, QUEST_TYPE } from 'libs/interfaces';

export class QuestDto {
  public static fromEntity(quest?: any | null) {
    return quest
      ? new QuestDto(
          quest.id,
          quest.title,
          quest.description,
          quest.type,
          quest.startDate,
          quest.endDate,
          quest.progress,
          quest.condition,
        )
      : null;
  }

  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _description: string | undefined,
    private readonly _type: QUEST_TYPE,
    private readonly _startDate: Date,
    private readonly _endDate: Date | undefined,
    private readonly _progress: number,
    private readonly _condition: QUEST_CONDITION,
  ) {}

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get description() {
    return this._description;
  }
  public get type() {
    return this._type;
  }

  public get startDate() {
    return this._startDate;
  }
  public get endDate() {
    return this._endDate;
  }
  public get progress() {
    return this._progress;
  }
  public get condition() {
    return this._condition;
  }
}
