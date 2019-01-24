import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { SessionComponent } from './session/session.component';
import { RemoteComponent } from './remote/remote.component';
import { ResultsComponent } from './results/results.component';
import { AttendeesComponent } from './attendees/attendees.component';
import { QuestionsComponent } from './questions/questions.component';
import { MoreComponent } from './more/more.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent},
  { path: 'session/:sessionId',
  component: SessionComponent,
  children: [
    {path: '', redirectTo: 'remote', pathMatch:'full' },
    {path: 'remote',  component: RemoteComponent}, 
    {path: 'results', component: ResultsComponent}, 
    {path: 'attendees', component: AttendeesComponent},
    {path: 'questions', component: QuestionsComponent},
    {path: 'more', component: MoreComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
