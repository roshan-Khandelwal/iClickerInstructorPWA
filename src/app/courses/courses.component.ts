import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  activeClassSessions : number = 0;
  activeClassSession : any;
  isLoading : boolean = true;

  constructor(private apiService : ApiService,
    private _router : Router) { }

  ngOnInit() {
    this.getActiveSessions();
  }

  getActiveSessions() {
    this.apiService.getCourses().subscribe(courseData => {
      console.log(courseData);
      for (let course of courseData.courses) {
        console.log("Course : " , course);
        this.apiService.getCourseSessionHistory(course.id).subscribe(sessionsData => {
          console.log(sessionsData);
          for (let session of sessionsData['sessions']) {
            console.log("Session info : ", session);
            if(! session['endDate']) {
              this.activeClassSessions += 1;
              this.activeClassSession = session;
            }
          }
          this.isLoading = false;
        });
      }
    });
  }

  joinSession() {
    this.apiService.joinSession(this.activeClassSession.courseId).subscribe(
      data => {
        //getSessionInfo
        this.apiService.getSessionInfo(this.activeClassSession.id).subscribe(
          (sessionData) => {
            console.log(sessionData);
            this._router.navigate(['/session', sessionData['session']['id']]);      
          });
    });
  }

}
