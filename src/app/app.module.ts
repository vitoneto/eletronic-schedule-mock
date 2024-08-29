import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactsManagementComponent } from './pages/contacts-management/contacts-management.component';
import { CreateContactComponent } from './pages/contacts-management/create-contact/create-contact.component';
import { EditContactDialogeComponent } from './pages/contacts-management/edit-contact-dialoge/edit-contact-dialoge.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactsManagementComponent,
    CreateContactComponent,
    EditContactDialogeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
