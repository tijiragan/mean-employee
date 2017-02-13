import {
  Component,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  EmployeeService
} from './employee.service';
import {
  DateEditorComponent
} from './dateEditor.component';
import {
  LocalDataSource
} from 'ng2-smart-table';
import {
  MdSnackBar
} from '@angular/material';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';
import {
  ConfirmDialog
} from './confirm-dialog.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  source: LocalDataSource;
  restActive: boolean = false;
  constructor(protected employeeService: EmployeeService, public snackBar: MdSnackBar, public dialog: MdDialog,private viewContainerRef: ViewContainerRef) {
    this.restActive = true;
    this.source = new LocalDataSource();
    this.employeeService.getEmployees().subscribe(
      response => {
        this.source.load(response['employees']);
        this.openSnackBar('Employees Found', 'Success');
      },
      error => {
        this.restActive = false;
        this.openSnackBar('Failed To Get Employees', 'Error');
      },
      () => {
        this.restActive = false;
      });

  }
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }
  public ngOnInit(): void { }

  public getAge(fromdatee) {
    let todate;
    if (todate) todate = new Date(todate);
    else todate = new Date();

    var age = [],
      fromdate = new Date(fromdatee),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0))--ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    if (ydiff > 0) age.push(ydiff + ' year' + (ydiff > 1 ? 's ' : ' '));
    if (mdiff > 0) age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ''));
    if (ddiff > 0) age.push(ddiff + ' day' + (ddiff > 1 ? 's' : ''));
    if (age.length > 1) age.splice(age.length - 1, 0, ' and ');
    return age.join('');
  }
  public settings: Object = {
    delete: {
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    },
    pager: {
      display: true,
      perPage: 5
    },
    actions: {
      add: false
    },
    edit: {
      confirmSave: true,
      inputClass: 'md-input',
      editButtonContent: '<md-icon>Edit</md-icon>'
    },
    columns: {
      name: {
        title: 'Full Name',
        editor: {
          type: 'text',
          config: {
            completer: {
            }
          }
        }
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      department: {
        title: 'Department',
        type: 'text',
        editor: {
          type: 'text',
          config: {
          }
        }
      },
      dob: {
        title: 'Date Of Birth',
        editor: {
          type: 'custom',
          component: DateEditorComponent
        }
      },
      gender: {
        title: 'Gender',
        editor: {
          type: 'list',
          config: {
            // true: 'Yes',
            // false: 'No'
            list: [{
              value: 'Male',
              title: 'Male'
            }, {
                value: 'Female',
                title: 'Female'
              }, {
                value: 'Other',
                title: 'Other'
              }]
          }
        }
      },
      age: {
        title: 'Age'
      }
    }
  };
  public addEmployee(e, value) {
    this.restActive = true;
    e.preventDefault();
    value.gender = this.selectedGender;
    let date1 = value.dob.toString();
    value.age = this.getAge(date1);
    this.employeeService.insertEmployee(value).subscribe(
      response => {
        this.source.append(value);
        this.openSnackBar('Employee Added', 'Success');
      },
      error => {
        this.restActive = false;
        this.openSnackBar(JSON.parse(error._body).message.split('edureka-db.employees.')[1], 'Error');
      },
      () => {
        this.restActive = false;
      }
    );
  }


  onDeleteConfirm(event): void {
    let dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restActive = true;
        let payload = {
          email: event.data.email
        }
        this.employeeService.deleteEmployee(payload).subscribe(
          response => {
            console.log('successfully deleted');
            // this.source.remove(event.data);
            event.confirm.resolve();
            this.openSnackBar('Employee Deleted', 'Success');
          },
          error => {
            event.confirm.reject();
            this.restActive = false;
            this.openSnackBar(error.message, 'Error');
          },
          () => {
            this.restActive = false;
          }
        );
      } else {
        event.confirm.reject();
      }
    });

  }

  onUpdateConfirm(event): void {
    let dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restActive = true;
        let date1 = event.newData.dob.toString();
        event.newData.age = this.getAge(date1);
        let payload = {
          email: event.data.email,
          update: event.newData
        }
        this.employeeService.updateEmployee(payload).subscribe(
          response => {
            this.source.update(event.data, event.newData);
            event.confirm.resolve();
            this.openSnackBar('Employee Updated', 'Success');
          },
          error => {
            event.confirm.reject();
            this.restActive = false;
            this.openSnackBar(JSON.parse(error._body).message.split('edureka-db.employees.')[1], 'Error');
          },
          () => {
            this.restActive = false;
          }

        );
      } else {
        event.confirm.reject();
      }
    });
  }
  selectedGender: string;

  genders = [{
    value: 'Male',
    viewValue: 'Male'
  }, {
      value: 'Female',
      viewValue: 'Female'
    }, {
      value: 'Other',
      viewValue: 'Other'
    }];

  color = 'primary';
  mode = 'query';
  mode2 = 'determinate';
}
