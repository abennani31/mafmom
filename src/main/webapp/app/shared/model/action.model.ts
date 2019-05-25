import { IContrat } from 'app/shared/model/contrat.model';
import { IMAFHistory } from 'app/shared/model/maf-history.model';

export const enum ActionType {
  MODIFICATION = 'MODIFICATION',
  AJOUT = 'AJOUT',
  SUPPRESSION = 'SUPPRESSION'
}

export interface IAction {
  id?: number;
  typeAction?: ActionType;
  libelleAction?: string;
  contrat?: IContrat;
  mAFHistory?: IMAFHistory;
}

export class Action implements IAction {
  constructor(
    public id?: number,
    public typeAction?: ActionType,
    public libelleAction?: string,
    public contrat?: IContrat,
    public mAFHistory?: IMAFHistory
  ) {}
}
