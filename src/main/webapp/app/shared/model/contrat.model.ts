import { Moment } from 'moment';
import { IMAF } from 'app/shared/model/maf.model';

export const enum EtatQueue {
  PREDEMANDE = 'PREDEMANDE',
  A_TRAITER = 'A_TRAITER',
  EN_COURS = 'EN_COURS',
  OK_POUR_AGORA = 'OK_POUR_AGORA',
  OK_POUR_PRODUCTION = 'OK_POUR_PRODUCTION'
}

export interface IContrat {
  id?: number;
  queueName?: string;
  dateDemande?: Moment;
  etatQueue?: EtatQueue;
  mAF?: IMAF;
}

export class Contrat implements IContrat {
  constructor(
    public id?: number,
    public queueName?: string,
    public dateDemande?: Moment,
    public etatQueue?: EtatQueue,
    public mAF?: IMAF
  ) {}
}
