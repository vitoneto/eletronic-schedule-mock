import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/schedule-interfaces';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  createUserStatus: boolean = false;
  passwordIsntTheSame: boolean = false;
  emailAlreadyExist: boolean = false;
  createUserSuccessMessage: boolean = false;
  createUserErrorMessage: boolean = false;
  userNotFound: boolean = false;
  wrongPassword: boolean = false;


  email = new FormControl<string>('');
  password = new FormControl<string>('');
  confirmPassword = new FormControl<string>('');
  admin = new FormControl<boolean>(false);

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getUserList()
    if(this.scheduleService.user) {
      // logar
    }
  }

  toggleCreateUser(): void {
    this.createUserStatus = !this.createUserStatus;
  }

  validadePassword(): boolean {
    if(this.password.value === this.confirmPassword.value) {
      this.passwordIsntTheSame = false;
      return true
    }

    this.passwordIsntTheSame = true;
    return false
  }

  clearForm() {
    this.email.reset();
    this.password.reset();
    this.confirmPassword.reset();
  }

  createUserSuccess() {
    this.clearForm()
    this.createUserSuccessMessage = true;
    this.createUserStatus = false;
    setTimeout(() => {
      this.createUserSuccessMessage = false;
    }, 3000)
  }

  createUserError() {
    this.createUserErrorMessage = true;
    setTimeout(() => {
      this.createUserErrorMessage = false
    }, 3000)
  }

  getUserList() {
    this.scheduleService.getUsers()
    .then((response) => this.scheduleService.userList = response)
    .catch((error) => console.log(error));
  }

  createUser() {
    if(!this.validadePassword()) {
      return
    }

    const props: User = {
      email: this.email.value?.trim(),
      passWord: this.password.value,
      admin: this.admin.value
    } as User

    this.scheduleService.createUser(props)
    .then((response) => {this.createUserSuccess(); this.getUserList()})
    .catch((error) => this.createUserError());
  }

  saveUser(user: any) {
    const user64 = btoa(JSON.stringify(user));
    localStorage.setItem('scheduleUser', user64)
  };

  isPasswordRight(passWord: string): boolean  {
    return this.password.value === passWord;
  }

  userNotFoundMessage() {
    this.userNotFound = true;
    setTimeout(() => {
      this.userNotFound = false;
    }, 3000)
  };

  wrongPasswordMessage() {
    this.wrongPassword = true;
    setTimeout(() => {
      this.wrongPassword = false;
    }, 3000)
  }

  login() {
    let user = this.scheduleService.userList && this.scheduleService.userList.find((element: any) => element.email == this.email.value);

    if(user) {

      if(!this.isPasswordRight(user.passWord)) {
        this.wrongPasswordMessage();
        return
      }

      this.saveUser(user);
      return
    }

    this.userNotFoundMessage();
  }
}
