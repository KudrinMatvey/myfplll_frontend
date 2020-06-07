// @ts-nocheck
import { ApiService } from './../api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { catchError } from "rxjs";
@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent implements OnInit {
  get matrix(): number[][] {
    return this._matrix;
  }

  @Input()
  set matrix(value: number[][]) {
    this._matrix = value;
    this.solutions = {};
    this.solution.emit(this.solutions);
  }
  methods = {
    voronoi: 'voronoi',
    listWithBound: 'list-with-bound',
    list: 'list',
    gaussWithBound: 'gauss-with-bound',
    gauss: 'gauss',
    lll: 'lll',
  };
  solutions;

  private _matrix: number[][];
  @Output()
  solution = new EventEmitter<any>();
  @Output()
  graphBasis = new EventEmitter<any>();

  error = false;
  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.solutions = {};
  }

  solve(method) {
    this.api
      .solve(method, this._matrix)
      .pipe
      // catchError(err => error = err.status != 200 )
      ()
      .subscribe((resp) => {
        this.solutions[method] = resp;
        this.solution.emit(this.solutions);
      });
  }
  draw() {
    if (this._matrix.length < 4 && this._matrix.length > 1) {
      if (this.solutions.lll) {
        this.graphBasis.emit(this.solutions.lll);
      } else if (this.solutions.voronoi) {
        this.graphBasis.emit(this.solutions.voronoi);
      } else {
        this.api
          .solve('lll', this._matrix)
          .pipe()
          .subscribe((resp) => {
            this.solutions.lll = resp;
            this.solution.emit(this.solutions);
            this.graphBasis.emit(this.solutions.lll);
          });
      }
    }
  }
}
