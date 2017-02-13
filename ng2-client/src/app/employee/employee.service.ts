import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {
  environment
} from '../../environments/environment';
import {
  Http,
  Headers
} from '@angular/http';


@Injectable()
export class EmployeeService {
  headers: any = new Headers({
    'Content-Type': 'application/json',
  });;
  constructor(private http: Http) {}

  getEmployees() {
    return this.http.get(environment.url, {
      headers: this.headers
    }).map(res => {
      return res.json();
    });
  }

  insertEmployee(data) {

    return this.http.post(environment.url, data, {
      headers: this.headers
    }).map(res => {

      return res.json();

    });
  }
  updateEmployee(data) {
    return this.http.put(environment.url, data, {
      headers: this.headers
    }).map(res => {

      return res.json();

    });
  }

  deleteEmployee(data) {

    data.headers = this.headers;
    return this.http.delete(environment.url, {
      body: data
    }).map(res => {
      return res.json();
    });
  }
}
