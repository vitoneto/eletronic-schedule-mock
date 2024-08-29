import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/interfaces/schedule-interfaces';

@Component({
  selector: 'app-edit-contact-dialoge',
  templateUrl: './edit-contact-dialoge.component.html',
  styleUrls: ['./edit-contact-dialoge.component.scss']
})
export class EditContactDialogeComponent implements OnInit{
  name = new FormControl<string>('');
  address = new FormControl<string>('');
  phone = new FormControl<string>('');
  email = new FormControl<string>('');

  constructor(
    public dialogRef: MatDialogRef<EditContactDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
  ) {}

  ngOnInit(): void {
    this.name.setValue(this.data.name);
    this.address.setValue(this.data.address);
    this.phone.setValue(this.data.phone);
    this.email.setValue(this.data.email);
  }

  contact(): any {
    const obj: Contact = {
      name: this.name.value ? this.name.value : this.data.name,
      address: this.address.value ? this.address.value : '',
      phone: this.phone.value ? this.phone.value : '',
      email: this.email.value ? this.email.value : '',
      id: this.data.id,
    }

    return obj
  }

}
