import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContrat } from 'app/shared/model/contrat.model';

@Component({
  selector: 'jhi-contrat-detail',
  templateUrl: './contrat-detail.component.html'
})
export class ContratDetailComponent implements OnInit {
  contrat: IContrat;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contrat }) => {
      this.contrat = contrat;
    });
  }

  previousState() {
    window.history.back();
  }
}
