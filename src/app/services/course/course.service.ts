import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course-model';
import { CourseUser } from '../../models/combined-models/course-user-model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = 'https://www.coursehub.somee.com/api/Courses/';
  constructor(private http: HttpClient) {}

  // Get all courses - returns list of courses (object)
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + 'courses');
  }

  // Adds user to given course - return true if success, false if fail (boolean)
  addUserToCourse(courseUser: CourseUser): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'addUser', courseUser);
  }

  // Getting list of courses given user has enrolled in - returns list of courseId (number)
  isUserEnrolled(userId: number): Observable<number[]> {
    return this.http.get<number[]>(this.url + 'isEnrolled/' + userId);
  }
}
