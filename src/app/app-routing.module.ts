import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContactsManagementComponent } from './pages/contacts-management/contacts-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contacts-management', component:  ContactsManagementComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
