import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMAFHistory } from 'app/shared/model/maf-history.model';

@Component({
  selector: 'jhi-maf-history-detail',
  templateUrl: './maf-history-detail.component.html'
})
export class MAFHistoryDetailComponent implements OnInit {
  mAFHistory: IMAFHistory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mAFHistory }) => {
      this.mAFHistory = mAFHistory;
    });
  }

  previousState() {
    window.history.back();
  }
}
