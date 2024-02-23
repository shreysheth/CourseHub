import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = 'https://localhost:7292/api/Courses/';
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any>(this.url + 'courses');
  }

  updateCourse(course: any): Observable<any> {
    return this.http.put<any>(this.url + 'updateCourse', course);
  }

  addUserToCourse(courseUser: any): Observable<any> {
    return this.http.post(this.url + 'addUser', courseUser);
  }

  isUserEnrolled(userId:number):Observable<any[]>{
    return this.http.get<any>(this.url + 'isEnrolled/' + userId);
  }
  
}
