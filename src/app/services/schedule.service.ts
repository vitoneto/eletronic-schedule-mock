import { Injectable } from '@angular/core';
import { Contact, User } from '../interfaces/schedule-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  user?: User | null;
  userList: any;
  url = 'https://64c3bbed67cfdca3b6603210.mockapi.io/api/v1/';
  userUrl = `${this.url}Users/`;
  contactUrl = `${this.url}Contacts/`;

  constructor(private http: HttpClient) { }

  getUsers() {
    return new Promise((resolve, reason) => {
      this.http.get(this.userUrl).subscribe(
        (response: any) => resolve(response),
        (response: any) => reason(response)
      )
    })
  }

  createUser(user: User) {
    return new Promise((resolve, reason) => {
      this.http.post(this.userUrl, user).subscribe(
        (Response: any) => resolve(Response),
        (Response: any) => reason(Response),
      )
    })
  }

  getContactList() {
    return new Promise((resolve, reason) => {
      this.http.get(this.contactUrl).subscribe(
        (response: any) => resolve(response),
        (response: any) => reason(response)
      )
    })
  }

  updateContact(contact: any) {
    return new Promise((resolve, reason) => {
      this.http.put(this.contactUrl + contact?.id, contact).subscribe(
        (response: any) => resolve(response),
        (response: any) => reason(response)
      )
    })
  }

  deleteContact(contact: any) {
    return new Promise((resolve, reason) => {
      this.http.delete(this.contactUrl + contact.id).subscribe(
        (response: any) => resolve(response),
        (response: any) => reason(response)
      )
    })
  }

  createContact(contact: any) {
    return new Promise((resolve, reason) => {
      this.http.post(this.contactUrl, contact).subscribe(
        (Response: any) => resolve(Response),
        (Response: any) => reason(Response),
      )
    })
  }
}
