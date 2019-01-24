import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApiService } from 'src/app/services/api.service';

import { HttpClientModule} from '@angular/common/http';
import { CoursesComponent } from './courses/courses.component';
import { WebsocketService } from 'src/app/services/websocket.service';
import { SessionComponent } from './session/session.component';
import { RemoteComponent } from './remote/remote.component';
import { ResultsComponent } from './results/results.component';
import { AttendeesComponent } from './attendees/attendees.component';
import { QuestionsComponent } from './questions/questions.component';
import { MoreComponent } from './more/more.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    SessionComponent,
    RemoteComponent,
    ResultsComponent,
    AttendeesComponent,
    QuestionsComponent,
    MoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
