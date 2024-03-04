import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginUser, User } from '../../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://www.coursehub.somee.com/api/Users/';
  constructor(private http: HttpClient) {}

  // Checks if user is registered or not - returns user (object)
  login(user: LoginUser): Observable<User> {
    return this.http.post<User>(this.url + 'login', user);
  }
}
