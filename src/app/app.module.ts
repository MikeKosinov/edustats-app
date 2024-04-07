import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import Angular apps components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SidenavigationComponent } from './components/sidenav/sidenavigation.component';
//Angular Material Components imports
import { StudentStatsComponent } from './components/sections/student-stats/student-stats.component';
import { StudentComponent } from './components/student/student.component';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './components/fileUploader/file-uploader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipe } from './pipes/filter.pipe';
import { GroupsComponent } from './components/sections/groups/groups.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentDescriptionComponent } from './components/student-description/student-description.component';
import { MatTableModule } from '@angular/material/table';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { DepartmentsStatsComponent } from './components/sections/departments-stats/departments-stats.component';
import { DognutChartComponent } from './components/charts/dognut-chart/dognut-chart.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { DistributionChartComponent } from './components/charts/distribution-chart/distribution-chart.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GroupRatingComponent } from './components/charts/group-charts/group-rating/group-rating.component';
import { GroupDistributionComponent } from './components/charts/group-charts/group-distribution/group-distribution.component';
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavigationComponent,
    FilterPipe,
    StudentStatsComponent,
    StudentComponent,
    FileUploaderComponent,
    GroupsComponent,
    StudentDescriptionComponent,
    LineChartComponent,
    DepartmentsStatsComponent,
    DognutChartComponent,
    BarChartComponent,
    DistributionChartComponent,
    GroupRatingComponent,
    GroupDistributionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    NgChartsModule,
    MatCardModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
