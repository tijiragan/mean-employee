import { Component, ViewChild, ElementRef } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
<input [ngClass]="inputClass"
            #dob
            type="date"
            class="form-control short-input"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()"><br>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    `
})
export class DateEditorComponent extends DefaultEditor {

  @ViewChild('dob') dob: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.cell.newValue !== ''){
      this.dob.nativeElement.value = this.getDob();
    }
  }

  updateValue(): void {
    const dob = this.dob.nativeElement.value;
    this.cell.newValue = `${dob}`;
  }

  getDob(): string {
    return this.htmlValue.nativeElement.innerText;
  }
}