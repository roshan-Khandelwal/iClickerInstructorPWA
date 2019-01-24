import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export class RemoteComponent implements OnInit {

  questionTypes = [
    {
      index: 0, type: 1,
      title: 'Multiple Choice'
    },
    {
      index: 1, type: 3,
      title: 'Short Answer'
    },
    {
      index: 2, type: 2,
      title: 'Numeric'
    },
    {
      index: 3, type: 5,
      title: 'Target'
    },
  ];

  inSession : boolean = false;
  activeQuestionType : any = {type : -1};

  activeSessionId : string;

  constructor(private route : ActivatedRoute, private apiService : ApiService) { 
    this.activeSessionId = this.route.snapshot.parent.paramMap.get('sessionId');
    console.log(this.activeSessionId);
  }

  ngOnInit() {
  }

  setQuestionType(questionType) {
    this.activeQuestionType = questionType;
  }


  createQuestion() {
    const bodyForRemoteStartQuestion = {
      sessionId: this.activeSessionId,
      questionType: this.activeQuestionType.type
    };
    this.apiService.createQuestion(bodyForRemoteStartQuestion).subscribe(
      questionData => {
        console.log(questionData);
        let questionId = questionData['id'];

        
      });
  } 

}
