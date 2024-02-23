import { Component, OnInit } from '@angular/core';
import { CourseTagService } from '../services/combined-services/course-tag.service';
import { CourseService } from '../services/course/course.service';

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
  apiData: any[] = [];
  userCourses:any[] = [];
  ngOnInit(): void {
    this.coursesWithTagsService.getCourseDataWithTags().subscribe(
      (response) => {
        this.apiData = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.courseService.isUserEnrolled(parseInt(localStorage.getItem("Id") ?? '0')).subscribe(
      (response) => {
        this.userCourses = response;
      },
      (error)=>{
        console.log(error);        
      }
    )
  }
  selectedItem: any; // To store the selected item from the list
  itemsPerPage: number = 4;
  currentPage: number = 1;
  searchText: string = '';

  showContent(item: any): void {
    // Update the selectedItem when a div is clicked
    this.selectedItem = item;
    console.log('div clicked');
    console.log(item);
    
  }
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
  getItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const filteredData = this.apiData.filter((item) =>
      this.searchFilter(item, this.searchText)
    );
    return filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  searchFilter(item: any, searchText: string): boolean {
    const searchKeywords = searchText
      .split(' ')
      .filter((keyword) => keyword.trim() !== '');
    const searchLowerKeywords = searchKeywords.map((keyword) =>
      keyword.toLowerCase()
    );

    // Check if any of the properties match any of the search keywords
    return searchLowerKeywords.every(
      (keyword) =>
        item.courseName.toLowerCase().includes(keyword) ||
        item.author.toLowerCase().includes(keyword) ||
        item.duration.toString().includes(keyword) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(keyword)) ||
        item.rating.toString().includes(keyword)
    );
  }

  getPaginationArray(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    const filteredData = this.apiData.filter((item) =>
      this.searchFilter(item, this.searchText)
    );
    return Math.ceil(filteredData.length / this.itemsPerPage);
  }

  isEnrolled(courseId: number): boolean {
    return this.userCourses.includes(courseId);
  }
  enrollUser(courseId:number, courseName:string){
    this.courseService.addUserToCourse({
      courseId: courseId,
      userId: parseInt(localStorage.getItem('Id') ?? '0'),
    }).subscribe(
      (response) =>{
        var username = localStorage.getItem("UserName");
        alert('Congratulations ' + username + '!! You have been successfully enrolled to '+ courseName + ' course. Happy Learning :)');
        location.reload();
      },
      (error) => {
        console.log(error);      
      }
    );
  }
}
