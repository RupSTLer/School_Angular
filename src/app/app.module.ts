import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
// import { BnNgIdleService } from 'bn-ng-idle';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BnNgIdleModule } from 'bn-ng-idle/lib/bn-ng-idle.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddStudentComponent } from './student_components/add-student/add-student.component';
import { UpdateStudentComponent } from './student_components/update-student/update-student.component';
import { ViewStudentComponent } from './student_components/view-student/view-student.component';
import { FooterComponent } from './footer/footer.component';
import { ListStudentComponent } from './student_components/list-student/list-student.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { AddTeacherComponent } from './teacher_components/add-teacher/add-teacher.component';
import { ListTeacherComponent } from './teacher_components/list-teacher/list-teacher.component';
import { UpdateTeacherComponent } from './teacher_components/update-teacher/update-teacher.component';
import { ViewTeacherComponent } from './teacher_components/view-teacher/view-teacher.component';
import { AdminProfileComponent } from './admin_components/admin-profile/admin-profile.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { CalendarModule } from 'angular-calendar';
import { NewsComponent } from './news/news.component';
import { StudentDashboardComponent } from './student_components/student-dashboard/student-dashboard.component';
import { MessageTeacherComponent } from './student_components/message-teacher/message-teacher.component';
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentProfileComponent } from './student_components/student-profile/student-profile.component';
import { ApplyLeaveComponent } from './student_components/apply-leave/apply-leave.component';
import { PayFeesComponent } from './student_components/pay-fees/pay-fees.component';
import { TeacherDashboardComponent } from './teacher_components/teacher-dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from './teacher_components/teacher-profile/teacher-profile.component';
import { ListLeavesComponent } from './teacher_components/list-leaves/list-leaves.component';
import { ListFeesComponent } from './teacher_components/list-fees/list-fees.component';
import { AboutComponent } from './admin/about/about.component';
import { ListMsgsComponent } from './teacher_components/list-msgs/list-msgs.component';
import { ClassScheduleComponent } from './student_components/class-schedule/class-schedule.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyMsgsComponent } from './student_components/my-msgs/my-msgs.component';
import { MyFeesComponent } from './student_components/my-fees/my-fees.component';
import { MyLeavesComponent } from './student_components/my-leaves/my-leaves.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegisterComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    ViewStudentComponent,
    FooterComponent,
    ListStudentComponent,
    AddTeacherComponent,
    ListTeacherComponent,
    UpdateTeacherComponent,
    ViewTeacherComponent,
    AdminProfileComponent,
    StudentDashboardComponent,
    NewsComponent,
    MessageTeacherComponent,
    StudentProfileComponent,
    ApplyLeaveComponent,
    PayFeesComponent,
    TeacherDashboardComponent,
    TeacherProfileComponent,
    ListLeavesComponent,
    ListFeesComponent,
    AboutComponent,
    ListMsgsComponent,
    ClassScheduleComponent,
    UserProfileComponent,
    MyMsgsComponent,
    MyFeesComponent,
    MyLeavesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    // BnNgIdleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    // NgIdleKeepaliveModule.forRoot(),
    CalendarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule


  ],
  providers: [
    // BnNgIdleService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
