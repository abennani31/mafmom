import { IContrat } from 'app/shared/model/contrat.model';

export interface IMAF {
  id?: number;
  version?: string;
  publie?: boolean;
  contrats?: IContrat[];
}

export class MAF implements IMAF {
  constructor(public id?: number, public version?: string, public publie?: boolean, public contrats?: IContrat[]) {
    this.publie = this.publie || false;
  }
}
