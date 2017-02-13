import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { DateEditorComponent } from './employee/dateEditor.component';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';
import { AppRoutingModule } from './app.routes';
import { PaginationModule } from 'ng2-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConfirmDialog } from './employee/confirm-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DateEditorComponent,
    ConfirmDialog
  ],
    entryComponents: [DateEditorComponent,ConfirmDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    PaginationModule.forRoot(),
    Ng2SmartTableModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
    exports: [
        ConfirmDialog,
    ]
})
export class AppModule { }
