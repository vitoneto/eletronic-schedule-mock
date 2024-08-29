import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;
  confirmPasswordIsValid: boolean = false;


  email = new FormControl<string>('');
  password = new FormControl<string>('');
  confirmPassword = new FormControl<string>('');
  admin = new FormControl<number>(0);

  constructor(
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserList();
    this.validateLoginForm();
    if(this.scheduleService.user) {
      this.redirectToManagement();
    }
  }

  redirectToManagement(): void {
    this.router.navigate(['/contacts-management']);
  }

  validateLoginForm(): void {
    this.email.valueChanges.subscribe(() => {
      const isEmailValid = this.email.value && this.email.value.length > 2;
      isEmailValid ? this.emailIsValid = true : this.emailIsValid = false;
    })

    this.password.valueChanges.subscribe(() => {
      const ispasswordValid = this.password.value && this.password.value.length > 0;
      ispasswordValid ? this.passwordIsValid = true : this.passwordIsValid = false;
    })

    this.confirmPassword.valueChanges.subscribe(() => {
      const isConfirmPasswordValid = this.confirmPassword.value && this.confirmPassword.value.length > 0;
      isConfirmPasswordValid ? this.confirmPasswordIsValid = true : this.confirmPasswordIsValid = false;
    })
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
    this.redirectToManagement();
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

      this.scheduleService.user = user
      this.saveUser(user);
      return
    }

    this.userNotFoundMessage();
  }
}
