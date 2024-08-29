import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/schedule-interfaces';
import { ScheduleService } from 'src/app/services/schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { EditContactDialogeComponent } from './edit-contact-dialoge/edit-contact-dialoge.component';

@Component({
  selector: 'app-contacts-management',
  templateUrl: './contacts-management.component.html',
  styleUrls: ['./contacts-management.component.scss']
})
export class ContactsManagementComponent implements OnInit{
  createContact: boolean = false;
  contactList: Contact[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getContactList()
    if(!this.scheduleService.user) {
      this.redirectToLogin();
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  toggleCreateContact() {
    this.createContact = !this.createContact;
  }

  deleteContact(contact: Contact): void {
    this.scheduleService.deleteContact(contact)
    .then((response: any) => this.getContactList())
    .catch((error: any) => console.log(error));
  }

  updateContact(contact: any): void {
    this.scheduleService.updateContact(contact)
    .then((response) => console.log(response))
    .catch((error: any) => console.log(error))
  }

  getContactList() {
    this.scheduleService.getContactList()
    .then((response: any) => this.contactList = response)
    .catch((error: any) => console.log(error));
  }

  logout() {
    localStorage.removeItem('scheduleUser');
    this.scheduleService.user = null;
    this.redirectToLogin();
  }

  openEditContactDialog(contact: any) {
    const dialogRef = this.dialog.open(EditContactDialogeComponent, {data: contact});

    dialogRef.afterClosed().subscribe((result) => {
      !!result && this.updateContact(result);
    })
  }
}
