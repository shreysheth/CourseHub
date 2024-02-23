import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { loginGuard } from './guards/auth/login.guard';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [{path: '', component:HomeComponent},{path: 'privacy', component: PrivacyComponent}, { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },{path: 'login', component: LoginComponent, canActivate: [loginGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
