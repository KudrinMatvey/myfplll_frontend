import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import {Subscription} from 'rxjs';
@Component({
  selector: 'matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.scss']
})
export class MatrixInputComponent implements OnInit {
  dimensions = [];
  currentDimension = 0;
  columsFormArray = new FormArray([]);
  selectionControl = new FormControl(2);
  subscribtion: Subscription;

  @Output()
  matrix = new EventEmitter<number[][]>();
  constructor(private cdr: ChangeDetectorRef) { }

  outputMatrix(){
    const matr = [];
    for (let index = 0; index < this.currentDimension; index++) {
      matr[index] = [];
      for (let j = 0; j < this.currentDimension; j++) {
          matr[index][j] = (this.columsFormArray.controls[index] as FormArray).controls[j].value;
      }
    }
    this.matrix.emit(matr);
    console.log(matr);
  }

  initArr(dimm: number) {
    for (let index = 2; index < 15; index++) {
      this.dimensions.push(index);
    }
    const tmp = new FormArray([]);
    for (let index = 0; index < this.currentDimension; index++) {
      const rowFormArray = new FormArray([]);
      tmp.push(rowFormArray);
      for (let j = 0; j < this.currentDimension; j++) {
        rowFormArray.push(new FormControl(0));
      }
    }
    this.columsFormArray = tmp;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.initArr(this.currentDimension);
    this.subscribtion = this.columsFormArray.valueChanges.subscribe(v => this.outputMatrix());
    this.selectionControl.valueChanges.subscribe(v => console.log(v));
  }

  changeDimension(curr, next) {
    if (curr < next) {
      this.currentDimension = next;
      const tmp = new FormArray([]);
      for (let index = 0; index < curr; index++) {
        const rowFormArray = new FormArray([]);
        tmp.push(rowFormArray);
        for (let j = 0; j < curr; j++) {
          rowFormArray.push((this.columsFormArray.controls[index] as FormArray).controls[j]);
        }
        for (let j = curr; j < next; j++) {
          rowFormArray.push(new FormControl(0));
        }
      }
      for (let index = curr; index < next; index++) {
          const rowFormArray = new FormArray([]);
          tmp.push(rowFormArray);
          for (let j = 0; j < next; j++) {
            rowFormArray.push(new FormControl(0));
          }
      }
      this.columsFormArray = tmp;
      this.cdr.detectChanges();
    }
    else if (curr > next) {
      this.currentDimension = next;
      const tmp = new FormArray([]);
      for (let index = 0; index < next; index++) {
        const rowFormArray = new FormArray([]);
        tmp.push(rowFormArray);
        for (let j = 0; j < next; j++) {
          rowFormArray.push((this.columsFormArray.controls[index] as FormArray).controls[j]);
        }
      }
      this.columsFormArray = tmp;
      this.cdr.detectChanges();
    }
    this.subscribtion.unsubscribe();
    this.subscribtion = this.columsFormArray.valueChanges.subscribe(v => this.outputMatrix());
    this.outputMatrix();
  }

  selectionChange(event: MatSelectChange) {
    this.changeDimension(this.currentDimension, event.value);
  }

  dds(a) {
    console.log(a);
  }

}
