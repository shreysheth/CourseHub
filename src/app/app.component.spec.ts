import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { RouterTestingModule } from '@angular/router/testing';
=======
>>>>>>> a415045eda77ba917fb44a7ecaf29f06cfbef71a
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
=======
      imports: [AppComponent],
>>>>>>> a415045eda77ba917fb44a7ecaf29f06cfbef71a
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have as title 'CourseManagementApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CourseManagementApp');
=======
  it(`should have the 'CourseManagemetApp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CourseManagemetApp');
>>>>>>> a415045eda77ba917fb44a7ecaf29f06cfbef71a
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
<<<<<<< HEAD
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, CourseManagementApp');
=======
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, CourseManagemetApp');
>>>>>>> a415045eda77ba917fb44a7ecaf29f06cfbef71a
  });
});
