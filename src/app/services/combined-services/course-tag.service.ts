import { Injectable } from '@angular/core';
import { CourseService } from '../course/course.service';
import { TagService } from '../tag/tag.service';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Course, CourseWithTags } from '../../models/course-model';

@Injectable({
  providedIn: 'root',
})
export class CourseTagService {
  constructor(
    private courseService: CourseService,
    private tagsService: TagService
  ) {}

  getDateString(date:string):string{
    var formattedDate = new Date(date);
    return formattedDate.getDate() + '/' + formattedDate.getMonth()+'/'+formattedDate.getFullYear()+' '+formattedDate.getHours()+':'+formattedDate.getMinutes();
  }

  getCourseDataWithTags(): Observable<CourseWithTags[]> {
    return this.courseService.getAllCourses().pipe(
      mergeMap((courses: Course[]) => {
        const requests = courses.map((course) => {
          return this.tagsService.getTagByCourseId(course.courseId).pipe(
            map((tags) => {
              return {
                courseId: course.courseId,
                courseName: course.courseName,
                author: course.author,
                duration: course.duration,
                userCount: course.userCount,
                created: this.getDateString(course.created ?? ''),
                lastActivity: this.getDateString(course.lastActivity ?? ''),
                rating: course.rating,
                tags: tags
              }
            })
          );
        });
        return forkJoin(requests);
      })
    );
  }
}
