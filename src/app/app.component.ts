import { Component } from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public api: ApiService) {
  }
  title = 'svp';
  matrix;
  solution = {};
  basis;
  setMatrix(n) {
    this.matrix = n;
  }
  setSolution(s) {
    this.solution = {...s};
  }
  setBasis(s) {
    this.basis = [...s];
  }
}
