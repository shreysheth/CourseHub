export class Course {
  courseId: number = 0;
  courseName: string = '';
  author: string = '';
  duration: number = 0;
  userCount: number = 0;
  created: string = '';
  lastActivity: string = '';
  rating: number = 0;
}
export class CourseWithTags {
  courseId: number = 0;
  courseName: string = '';
  author: string = '';
  duration: number = 0;
  userCount: number = 0;
  created: string = '';
  lastActivity: string = '';
  rating: number = 0;
  tags: string[] = [];
}
