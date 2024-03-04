import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private url = 'https://www.coursehub.somee.com/api/Tags/';
  constructor(private http: HttpClient) {}

  // Gives list of tags given to specified course - Returns list of tags (string)
  getTagByCourseId(courseId: number): Observable<string[]> {
    return this.http.get<string[]>(this.url + courseId);
  }
}
