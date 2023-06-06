import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddStudentComponent } from './student_components/add-student/add-student.component';
import { ListStudentComponent } from './student_components/list-student/list-student.component';
import { UpdateStudentComponent } from './student_components/update-student/update-student.component';
import { ViewStudentComponent } from './student_components/view-student/view-student.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { AdminProfileComponent } from './admin_components/admin-profile/admin-profile.component';
import { NewsComponent } from './news/news.component';
import { AddTeacherComponent } from './teacher_components/add-teacher/add-teacher.component';
import { ListTeacherComponent } from './teacher_components/list-teacher/list-teacher.component';
import { ViewTeacherComponent } from './teacher_components/view-teacher/view-teacher.component';
import { UpdateTeacherComponent } from './teacher_components/update-teacher/update-teacher.component';
import { StudentDashboardComponent } from './student_components/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student_components/student-profile/student-profile.component';
import { MessageTeacherComponent } from './student_components/message-teacher/message-teacher.component';
import { ApplyLeaveComponent } from './student_components/apply-leave/apply-leave.component';
import { PayFeesComponent } from './student_components/pay-fees/pay-fees.component';
import { TeacherDashboardComponent } from './teacher_components/teacher-dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from './teacher_components/teacher-profile/teacher-profile.component';
import { ListLeavesComponent } from './teacher_components/list-leaves/list-leaves.component';
import { ListFeesComponent } from './teacher_components/list-fees/list-fees.component';
import { ListMsgsComponent } from './teacher_components/list-msgs/list-msgs.component';
import { ClassScheduleComponent } from './student_components/class-schedule/class-schedule.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyMsgsComponent } from './student_components/my-msgs/my-msgs.component';
import { MyFeesComponent } from './student_components/my-fees/my-fees.component';
import { MyLeavesComponent } from './student_components/my-leaves/my-leaves.component';


//configuring the routes for our components
//we apply authguard on role specific components(user, admin)
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  //student 
  { path: 'studentDashboard', component: StudentDashboardComponent },
  { path: 'studentProfile', component: StudentProfileComponent },
  { path: 'addStudent', component: AddStudentComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'listStudent', component: ListStudentComponent },
  { path: 'viewStudent/:studentId', component: ViewStudentComponent },
  { path: 'updateStudent/:studentId', component: UpdateStudentComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'msgTeacher', component: MessageTeacherComponent },
  { path: 'applyLeave', component: ApplyLeaveComponent },
  { path: 'payFees', component: PayFeesComponent },
  { path: 'schedule', component: ClassScheduleComponent },
  { path: 'myMsgs', component: MyMsgsComponent },
  { path: 'myFees', component: MyFeesComponent },
  { path: 'myLeaves', component: MyLeavesComponent },
  //teacher
  { path: 'teacherDashboard', component: TeacherDashboardComponent },
  { path: 'teacherProfile', component: TeacherProfileComponent },
  { path: 'addTeacher', component: AddTeacherComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'listTeacher', component: ListTeacherComponent },
  { path: 'viewTeacher/:teacherId', component: ViewTeacherComponent },
  { path: 'updateTeacher/:teacherId', component: UpdateTeacherComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'adminProfile', component: AdminProfileComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'listLeaves', component: ListLeavesComponent },
  { path: 'listFees', component: ListFeesComponent },
  { path: 'listMsgs', component: ListMsgsComponent },

  {path: 'userProfile', component: UserProfileComponent},
  { path: 'news', component: NewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
