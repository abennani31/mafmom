import { Moment } from 'moment';
import { IAction } from 'app/shared/model/action.model';

export interface IMAFHistory {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  actions?: IAction[];
}

export class MAFHistory implements IMAFHistory {
  constructor(public id?: number, public startDate?: Moment, public endDate?: Moment, public actions?: IAction[]) {}
}
