import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './services/schedule.service';
import { User } from './interfaces/schedule-interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eletronic-schedule-mock';

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn(): void {
    const user: User = JSON.parse(JSON.stringify(localStorage.getItem('scheduleUser')));
    if(user) {
      this.scheduleService.user = {...user}
    }
  }
}
