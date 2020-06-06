import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
