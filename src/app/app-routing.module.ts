import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { StudentStatsComponent } from './components/sections/student-stats/student-stats.component';
import { StudentComponent } from './components/student/student.component';
import { FileUploaderComponent } from './components/fileUploader/file-uploader.component';
import { GroupsComponent } from './components/sections/groups/groups.component';
import {DepartmentsStatsComponent} from "./components/sections/departments-stats/departments-stats.component";

const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'students', component: StudentStatsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'uploadData', component: FileUploaderComponent, },
  { path: 'student', component: StudentComponent }, //will be added dinamic route
  { path: 'department', component: DepartmentsStatsComponent },
  // {path:'groups,', component:}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
