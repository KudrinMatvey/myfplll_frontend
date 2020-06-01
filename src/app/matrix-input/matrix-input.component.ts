import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.scss']
})
export class MatrixInputComponent implements OnInit {
  dimensions = []
  currentDimension = 2;
  columsFormArray = new FormArray([]);
  selectionControl = new FormControl(2);
  constructor(private cdr: ChangeDetectorRef) { }

  initArr(dimm: number) {
    for (let index = 2; index < 15; index++) {
      this.dimensions.push(index);
    }
    const tmp = new FormArray([]);
    for (let index = 0; index < this.currentDimension; index++) {
      const rowFormArray = new FormArray([]);
      tmp.push(rowFormArray);
      for (let j = 0; j < this.currentDimension; j++) {
        rowFormArray.push(new FormControl())
      }
    }
    this.columsFormArray = tmp;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.initArr(this.currentDimension);
  }

  changeDimension(curr, next) {
    if(curr < next) {
      const tmp = new FormArray([]);
      for (let index = 0; index < curr; index++) {
        const rowFormArray = new FormArray([]);
        tmp.push(this.columsFormArray.controls[index]);
        for (let j = 0; j < curr; j++) {
          rowFormArray.push(this.columsFormArray.controls[index][j]);
        }
        for (let j = curr; j < next; j++) {
          rowFormArray.push(new FormControl());
        }        
      }
      for (let index = curr; index < next; index++) {
          const rowFormArray = new FormArray([]);
          tmp.push(rowFormArray);
          for (let j = 0; j < this.currentDimension; j++) {
            rowFormArray.push(new FormControl())
          }
      }
      this.currentDimension = next;
      this.columsFormArray = tmp;
      this.cdr.detectChanges();
    }
    else if(curr > next) {
      const tmp = new FormArray([]);
      for (let index = 0; index < curr; index++) {
        const rowFormArray = new FormArray([]);
        tmp.push(this.columsFormArray.controls[index]);
        for (let j = 0; j < curr; j++) {
          rowFormArray.push(this.columsFormArray.controls[index][j]);
        }        
      }
      this.currentDimension = next;
      this.columsFormArray = tmp;
      this.cdr.detectChanges();
    }
  }
  
  selectionChange(event: MatSelectChange) {
    this.changeDimension(this.currentDimension, event.value);
  }

}
