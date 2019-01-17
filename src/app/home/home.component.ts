import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService : ApiService, 
    private _router : Router) { }

  ngOnInit() {
  }

  login(username, password) {
    console.log(username + " " + password);
    this.apiService.login(username, password).subscribe(data => {
      console.log(data);
      this.apiService.setLoginData(data);
      this._router.navigate(['/courses']);      
    });

  }

}
