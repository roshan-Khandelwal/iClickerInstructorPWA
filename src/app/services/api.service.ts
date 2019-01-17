import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { buildAuthHeaders, buildRequestHeaders } from 'src/app/utils/utils';

let apiUrl = "https://api.reef-education.com/trogon";

let urls = {
  /* Login */
  LOGIN: '/v2/account/login',

  /* Course */
  GET_COURSES: '/v11/account/course/list',
  GET_COURSE_SESSION: '/v3/course/session/history',
  GET_COURSE_ROSTER: '/v4/roster/course/',
  GET_COURSE_ATTENDANCE: '/v4/course/attendance/',

  /* Session */
  GET_SESSION: '/v2/session/info/',
  CREATE_COURSE_SESSION: '/v2/session/course/create/',
  END_SESSION: '/v1/session/end/',

  /* Question */
  CREATE_QUESTION: '/v7/question/',
  GET_QUESTIONS: '/v7/question?sessionId=',
  END_QUESTION: '/v1/question/end/',
  GET_QUESTION_RESULTS: '/v1/question?results=',
  GET_QUESTION: '/v7/question/',
  GET_QUESTION_ANSWERS: '/v1/question/answer?questionId=',
  GRADE_QUESTION: '/v1/question/grade/update/',
  GRADE_TARGET_QUESTION: '/v1/question/target/grade/',
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loginData : any;

  setLoginData(data) {
    this.loginData = data;
  }

  getLoginData() {
    return this.loginData;
  }

  constructor(private _http: HttpClient) { }

  login(username, password) : Observable<any>{
    let loginUrl : string = "https://api-gateway-dev.reef-education.com/authproxy/login" // apiUrl + urls.LOGIN;
    return this._http.post(loginUrl, {"email" : username, "password" : password}, {
      headers : {
        "Content-Type": "application/vnd.reef.login-proxy-request-v1+json",
        Accept: "application/json",
        "Reef-Auth-Type": "oauth"
      }
    });
  }  

  getCourses(body?) : Observable<any> {
    let courseUrl : string = "https://api-dev.reef-education.com/trogon" + urls.GET_COURSES;

    // let headers = buildRequestHeaders(this.getLoginData(), "GET", body);
    const headers = {
      'Content-Type': 'application/json',
      Accept: "application/json",
      "Reef-Auth-Type": "oauth",
      'Authorization': `Bearer ${this.loginData.access_token}`
    }

    return this._http.get(courseUrl, {
      headers : headers
    });
  }

  getCourseSessionHistory(courseId) : Observable<any> {

    let sessionHistoryUrl : string = "https://api-dev.reef-education.com/trogon" + urls.GET_COURSE_SESSION;
    let params = new HttpParams().set('id', courseId);

    const headers = {
      'Content-Type': 'application/json',
      Accept: "application/json",
      "Reef-Auth-Type": "oauth",
      'Authorization': `Bearer ${this.loginData.access_token}`
    }

    return this._http.get(sessionHistoryUrl, {
      headers : headers,
      params : params
    });
  }

}
