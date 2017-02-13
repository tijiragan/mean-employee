import { Component,ViewContainerRef } from '@angular/core';
import { AppModule } from '../app/app.module';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'app works!';
}
