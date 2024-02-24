import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor (private userService: UserService, private router: Router){}
  username: string = '';
  password: string = '';
  onSubmit() {
    const user = {
      userName : this.username,
      userPassword : this.password,
    };
    this.userService.login(user).subscribe(
      (response) => {
        localStorage.setItem("Id", response.userId.toString());
        localStorage.setItem("UserName", response.userName);
        this.router.navigate(['courses']);  
      },
      (error) => {
        console.log(error);
        
      }
    )
  }
}
