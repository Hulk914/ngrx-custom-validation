import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [{
    provide: NGRX_FORM_VIEW_ADAPTER,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }]
})

export class CustomInputComponent implements FormViewAdapter {

  @ViewChild('input') input;
  @Input() suffix = '';
  updateValue: Function;
  localValue: string; // will have data without suffix
  isFirst = true;
  value = ''; // binded to input with ngModel

  constructor() { }

  // Code based on scenario
  inputChanged(value) {
    // you can write any validation or regex here and decide to update accordingly
    this.value = value;
    this.localValue = value;
    this.updateValue(value);
  }

  handleFocus() {
    this.value = this.localValue;
  }

  handleFocusOut() {
    if (this.value && this.suffix) {
      this.value += this.suffix;
    }
  }

  // Adapter Functions
  setViewValue(value: any): void {
    this.value = value ? value + this.suffix : value;
    this.localValue = value;
  }
  setOnChangeCallback(fn: any) {
    console.log("on change", fn);
    this.updateValue = fn;
  }
  setOnTouchedCallback(fn: () => void): void {
    // throw new Error('Method not implemented.');
  }
  setIsDisabled?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}
