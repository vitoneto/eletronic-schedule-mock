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
    let user = JSON.parse(JSON.stringify(localStorage.getItem('scheduleUser')));

    const storedScheduleUser = localStorage.getItem('scheduleUser');

    if (storedScheduleUser) {
      user = JSON.parse(atob(storedScheduleUser));
      this.scheduleService.user = {...user}
    }
  }
}
