import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private url = 'https://localhost:7292/api/Tags/';
  constructor(private http: HttpClient) {}

  getTagByCourseId(courseId:number):Observable<any>{
    return this.http.get<any>(this.url+courseId);
  }

}
