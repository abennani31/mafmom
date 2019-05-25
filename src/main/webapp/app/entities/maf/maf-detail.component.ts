import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMAF } from 'app/shared/model/maf.model';

@Component({
  selector: 'jhi-maf-detail',
  templateUrl: './maf-detail.component.html'
})
export class MAFDetailComponent implements OnInit {
  mAF: IMAF;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mAF }) => {
      this.mAF = mAF;
    });
  }

  previousState() {
    window.history.back();
  }
}
