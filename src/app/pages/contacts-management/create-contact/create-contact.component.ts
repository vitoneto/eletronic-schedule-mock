import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact, User } from 'src/app/interfaces/schedule-interfaces';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})

export class CreateContactComponent implements OnInit{
  @Output() checkContactListEvent = new EventEmitter()
  createButton: boolean = false;

  @Output() createNewContactEvent = new EventEmitter()
  createContactSucess: boolean = false;
  createContactError: boolean = false;

  name = new FormControl<string>('');
  address = new FormControl<string>('');
  phone = new FormControl<string>('');
  email = new FormControl<string>('');

  constructor(public scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.nameValidator();
  }

  nameValidator(): void {
    this.name.valueChanges.subscribe(() => {
      const isNameValid = this.name.value && this.name.value.length > 2;
      this.createButton = isNameValid ? true : false;
    })
  }

  createContactSucessMessage() {
    this.createContactSucess = true;
    setTimeout(() => {
      this.createContactSucess = false;
    }, 3000);
  }
  createContactErrorMessage() {
    this.createContactError = true;
    setTimeout(() => {
      this.createContactError = false;
    }, 3000);
  }

  cleanForm() {
      this.name.reset();
      this.address.reset();
      this.phone.reset();
      this.email.reset();
  }

  createContact(): void {
    const props = {
      name: this.name.value?.trim(),
      address: this.address.value?.trim(),
      phone: this.phone.value?.trim(),
      email: this.email.value?.trim()
    }

    this.scheduleService.createContact(props)
    .then((response: any) => {
      this.createContactSucessMessage();
      this.cleanForm();
      this.createNewContactEvent.emit()
    })
    .catch((error: any) => this.createContactErrorMessage());
  }

  checkContactList(): void {
    this.checkContactListEvent.emit();
  }
}
