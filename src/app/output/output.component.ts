import {Component, OnInit, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  @ViewChild('matrixDisplay')
  matrixDisplay;
  _solution = {};
  methods = {
    voronoi: 'voronoi',
    listWithBound: 'list-with-bound',
    list: 'list',
    gaussWithBound: 'gauss-with-bound',
    gauss: 'gauss',
    lll: 'lll',
  };
  _basis = [];
  indeices = {
    lllGenerated: 0,
    lll: 1,
    zero: 2,
    gauss: 3,
    listWithBound: 4,
    gaussWithBound: 5,
    voronoi: 6,
    list: 7,
  };
  public graph = {
    data: [],
    layout: { width: 640, height: 480, title: 'A Fancy Plot' },
  };
  graphShown = false;
  solutionNames: string[];
  solutionValues: string[];
  @Input()
  set basis(s) {
    this._basis = s;
    if (s) {
      this.graph = {
        data: [],
        layout: { width: 640, height: 480, title: 'A Fancy Plot' },
      };
      if (s.length === 3) {
        this.setUp3dLattice(s);
        this.graphShown = true;
      } else if (s.length === 2) {
        this.setUp2dLattice(s);
        this.graphShown = true;
      } else {
        this.graphShown = false;
      }
    }
  }

  private setUp3dLattice(s) {
    const x = [],
      y = [],
      z = [];
    const coef = 10;
    const xLim = Math.max(Math.abs(coef * s[0][0]), Math.abs(coef * s[1][0]), Math.abs(coef * s[2][0]));
    const yLim = Math.max(Math.abs(coef * s[0][1]), Math.abs(coef * s[1][1]), Math.abs(coef * s[2][1]));
    const zLim = Math.max(Math.abs(coef * s[0][2]), Math.abs(coef * s[1][2]), Math.abs(coef * s[2][2]));
    const limit = 5;
    const index = 0;
    for (let i = 0; i < limit; i++) {
      for (let j = 0; j < limit; j++) {
        for (let k = 0; k < limit; k++) {
          if (i + j + k > 1) {
            const _x = i * s[0][0] + j * s[1][0] + k * s[2][0];
            const _y = i * s[0][1] + j * s[1][1] + k * s[2][1];
            const _z = i * s[0][2] + j * s[1][2] + k * s[2][2];
            if (
              Math.abs(_x) < xLim &&
              Math.abs(_y) < yLim &&
              Math.abs(_z) < zLim
            ) {
              x.push(_x);
              y.push(_y);
              z.push(_z);
            }
          }
        }
      }
    }
    const x0 = [s[0][0], s[1][0], s[2][0]];
    const y0 = [s[0][1], s[1][1], s[2][1]];
    const z0 = [s[0][2], s[1][2], s[2][2]];
    this.graph.data[this.indeices.lllGenerated] = {
      name: 'Решетка',
      x,
      y,
      z,
      type: 'scatter3d',
      mode: 'markers',
      marker: {color: 'red'},
    };
    this.graph.data[this.indeices.zero] = {
      name: 'Ноль',
      x: [0],
      y: [0],
      z: [0],
      type: 'scatter3d',
      mode: 'markers',
      marker: {color: 'yellow'},
    };
    this.graph.data[this.indeices.lll] = {
      name: 'lll-базис',
      x: x0,
      y: y0,
      z: z0,
      type: 'scatter3d',
      mode: 'markers',
      marker: {color: 'blue'},
    };
  }
  private setUp2dLattice(s) {
    const x = [],
      y = [],
      z = [];
    const coef = 10;
    const xLim = Math.max(Math.abs(coef * s[0][0]), Math.abs(coef * s[1][0]));
    const yLim = Math.max(Math.abs(coef * s[0][1]), Math.abs(coef * s[1][1]));
    const limit = 10;
    const index = 0;
    for (let i = 0; i < limit; i++) {
      for (let j = 0; j < limit; j++) {
          if (i + j > 1) {
            const _x = i * s[0][0] + j * s[1][0];
            const _y = i * s[0][1] + j * s[1][1];
            if (
              Math.abs(_x) < xLim &&
              Math.abs(_y) < yLim
            ) {
              x.push(_x);
              y.push(_y);
            }
        }
      }
    }
    const x0 = [s[0][0], s[1][0]];
    const y0 = [s[0][1], s[1][1]];
    this.graph.data[this.indeices.lllGenerated] = {
      name: 'Решетка',
      x,
      y,
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'red'},
    };
    this.graph.data[this.indeices.zero] = {
      name: 'Ноль',
      x: [0],
      y: [0],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'yellow'},
    };
    this.graph.data[this.indeices.lll] = {
      name: 'lll-базис',
      x: x0,
      y: y0,
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'blue'},
    };
  }

  get basis() {
    return this._basis;
  }
  @Input()
  set solution(s) {
    this.solutionValues = Object.values(s);
    this.solutionNames = Object.keys(s);
    if (Object.keys(s).length === 0) {
      this.graphShown = false;
      this.graph = {
        data: [],
        layout: { width: 640, height: 480, title: 'A Fancy Plot' },
      };
      return;
    }
    const tmp = [
      this.graph.data[this.indeices.lllGenerated],
      this.graph.data[this.indeices.lll],
      this.graph.data[this.indeices.zero],
    ];
    if (this._basis && this._basis.length === 3) {
    this.setUp3dPlotSolution(s, tmp);
    this.graphShown = true;
    } else if (this._basis && this._basis.length === 2){
      this.setUp2dPlotSolution(s, tmp);
      this.graphShown = true;
    } else {
      this.graph = {
        data: [],
        layout: { width: 640, height: 480, title: 'A Fancy Plot' },
      };
      this.graphShown = false;
    }
    this.graph.data = tmp.filter(_s => !!_s);
  }

  private setUp3dPlotSolution(s, tmp) {
    if (s[this.methods.voronoi]) {
      const t = s[this.methods.voronoi];
      tmp[this.indeices.voronoi] = {
        name: 'Базис декомпозиции Вороного',
        x: [t[0][0], t[1][0], t[1][0]],
        y: [t[0][1], t[1][1], t[1][1]],
        z: [t[0][2], t[1][2], t[1][2]],
        type: 'scatter3d',
        mode: 'markers',
        marker: {color: 'cyan'},
      };
    }
    if (s[this.methods.list]) {
      const t = s[this.methods.list];
      tmp[this.indeices.list] = {
        name: 'List sieve',
        x: [t[0]],
        y: [t[1]],
        z: [t[2]],
        type: 'scatter3d',
        mode: 'markers',
        marker: {color: 'grey'},
      };
    }
    if (s[this.methods.listWithBound]) {
      const t = s[this.methods.listWithBound];
      tmp[this.indeices.listWithBound] = {
        name: 'List sieve с оценкой',
        x: [t[0]],
        y: [t[1]],
        z: [t[2]],
        type: 'scatter3d',
        mode: 'markers',
        marker: {color: 'grey'},
      };
    }
    if (s[this.methods.gauss]) {
      const t = s[this.methods.gauss];
      tmp[this.indeices.gauss] = {
        name: 'Gauss sieve',
        x: [t[0]],
        y: [t[1]],
        z: [t[2]],
        type: 'scatter3d',
        mode: 'markers',
        marker: {color: 'lavander'},
      };
    }
    if (s[this.methods.gaussWithBound]) {
      const t = s[this.methods.gaussWithBound];
      tmp[this.indeices.gaussWithBound] = {
        name: 'Gauss sieve с оценкой',
        x: [t[0]],
        y: [t[1]],
        z: [t[2]],
        type: 'scatter3d',
        mode: 'markers',
        marker: {color: 'orange'},
      };
    }
  }
  private setUp2dPlotSolution(s, tmp) {
    if (s[this.methods.voronoi]) {
      const t = s[this.methods.voronoi];
      tmp[this.indeices.voronoi] = {
        name: 'Базис декомпозиции Вороного',
        x: [t[0][0], t[1][0]],
        y: [t[0][1], t[1][1]],
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'cyan'},
      };
    }
    if (s[this.methods.list]) {
      const t = s[this.methods.list];
      tmp[this.indeices.list] = {
        name: 'List sieve',
        x: [t[0]],
        y: [t[1]],
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'grey'},
      };
    }
    if (s[this.methods.listWithBound]) {
      const t = s[this.methods.listWithBound];
      tmp[this.indeices.listWithBound] = {
        name: 'List sieve с оценкой',
        x: [t[0]],
        y: [t[1]],
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'grey'},
      };
    }
    if (s[this.methods.gauss]) {
      const t = s[this.methods.gauss];
      tmp[this.indeices.gauss] = {
        name: 'Gauss sieve',
        x: [t[0]],
        y: [t[1]],
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'lavender'},
      };
    }
    if (s[this.methods.gaussWithBound]) {
      const t = s[this.methods.gaussWithBound];
      tmp[this.indeices.gaussWithBound] = {
        name: 'Gauss sieve с оценкой',
        x: [t[0]],
        y: [t[1]],
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'orange'},
      };
    }
  }

  get solution() {
    return this._solution;
  }

  constructor() {}
  ngOnInit(): void {}
}
