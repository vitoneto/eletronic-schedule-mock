import { Injectable } from '@angular/core';
import { User } from '../interfaces/schedule-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  user?: User;
  userList: any;
  url = 'https://64c3bbed67cfdca3b6603210.mockapi.io/api/v1/Users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return new Promise((resolve, reason) => {
      this.http.get(this.url).subscribe(
        (response: any) => resolve(response),
        (response: any) => reason(response)
      )
    })
  }

  createUser(user: User) {
    return new Promise((resolve, reason) => {
      this.http.post(this.url, user).subscribe(
        (Response: any) => resolve(Response),
        (Response: any) => reason(Response),
      )
    })
  }
}
