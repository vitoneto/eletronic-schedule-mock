import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  createUser: boolean = false;
  passwordIsntTheSame: boolean = false;
  emailAlreadyExist: boolean = false;

  user = new FormControl('');
  password = new FormControl('');
  admin = new FormControl(false);

  ngOnInit(): void {}

  toggleCreateUser(): void {
    this.createUser = !this.createUser;
  }
}
