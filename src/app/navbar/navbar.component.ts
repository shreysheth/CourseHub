import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router){}
  isLoggedIn():boolean{
    return parseInt(localStorage.getItem('Id') ?? '0', 10) != 0;
  }
  logOut(){
    localStorage.clear();
    localStorage.setItem("Id", '0');
    this.router.navigate(['/'])
  }
}
