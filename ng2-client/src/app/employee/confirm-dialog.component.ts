import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
<h1 md-dialog-title>Employee App</h1>
<div md-dialog-content>Are you Sure?</div>
<div md-dialog-actions>
  <button md-button (click)="dialogRef.close(true)">Yes</button>
  <button md-button (click)="dialogRef.close(false)">No</button>
</div>
    `,
})
export class ConfirmDialog {

    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

    }
}
