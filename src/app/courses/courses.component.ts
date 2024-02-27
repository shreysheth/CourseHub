import { Component, OnInit } from '@angular/core';
import { CourseTagService } from '../services/combined-services/course-tag.service';
import { CourseService } from '../services/course/course.service';
import { Course, CourseWithTags } from '../models/course-model';
import { User } from '../models/user-model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  constructor(
    private coursesWithTagsService: CourseTagService,
    private courseService: CourseService
  ) {}

  allCourses: CourseWithTags[] = []; // List of all the courses
  userCourses: number[] = []; // List of all the courseId that logged user has been enrolled in

  // To store the user for component use
  user: User = {
    userId: parseInt(localStorage.getItem('Id') ?? '0'),
    userName: localStorage.getItem('UserName') ?? '',
    userPassword: ''
  };

  selectedCourse:any; // To store the selected course from the list

  // For Pagination
  coursesPerPage: number = 4;
  currentPage: number = 1;

  // To store search string
  searchText: string = '';

  ngOnInit(): void {
    // For getting all courses
    this.coursesWithTagsService.getCourseDataWithTags().subscribe(
      (response) => {
        this.allCourses = response;
      },
      (error) => {
        console.log(error);
      }
    );

    // For getting all courseId of logged user
    this.courseService.isUserEnrolled(this.user.userId).subscribe(
      (response) => {
        this.userCourses = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Logic for displaying rating stars
  getFullStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  getRemainingStars(rating: number): number[] {
    if (this.hasHalfStar(rating)) {
      return Array(5 - (Math.floor(rating) + 1)).fill(0);
    } else {
      return Array(5 - Math.floor(rating));
    }
  }

  // Search functionality
  searchFilter(course: CourseWithTags, searchText: string): boolean {
    const searchKeywords = searchText
      .split(' ')
      .filter((keyword) => keyword.trim() !== '');
    const searchLowerKeywords = searchKeywords.map((keyword) =>
      keyword.toLowerCase()
    );

    return searchLowerKeywords.every(
      (keyword) =>
        course.courseName.toLowerCase().includes(keyword) ||
        course.author.toLowerCase().includes(keyword) ||
        course.duration.toString().includes(keyword) ||
        course.tags.some((tag: string) => tag.toLowerCase().includes(keyword)) ||
        course.rating.toString().includes(keyword)
    );
  }

  // For Pagination - displays list of specified number of courses on one page
  getCoursesPerPage(): CourseWithTags[] {
    const startIndex = (this.currentPage - 1) * this.coursesPerPage;

    // using filtered data instead of actual data to update pagination based on search results
    const filteredData = this.allCourses.filter((item) =>
      this.searchFilter(item, this.searchText)
    );

    if (!filteredData.includes(this.selectedCourse)) {
      this.selectedCourse = null;
    }

    return filteredData.slice(startIndex, startIndex + this.coursesPerPage);
  }

  getPaginationArray(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    const filteredData = this.allCourses.filter((item) =>
      this.searchFilter(item, this.searchText)
    );
    return Math.ceil(filteredData.length / this.coursesPerPage);
  }

  // For displaying course content on right
  showContent(course: CourseWithTags): void {
    this.selectedCourse = course;
  }

  // To check if user is enrolled in the given course or not
  isEnrolled(courseId: number): boolean {
    return this.userCourses.includes(courseId);
  }

  // To enroll a user in a given course
  enrollUser(courseId: number, courseName: string) {
    this.courseService
      .addUserToCourse({
        courseId: courseId,
        userId: this.user.userId,
      })
      .subscribe(
        (response) => {
          alert(
            'Congratulations ' +
              this.user.userName +
              '!! You have been successfully enrolled to ' +
              courseName +
              ' course. Happy Learning :)'
          );
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
