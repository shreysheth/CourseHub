import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://localhost:7292/api/Users/';
  constructor(private http: HttpClient) {}

  login(user:any):Observable<any>{
    return this.http.post<any>(this.url+"login", user);
  }
}
