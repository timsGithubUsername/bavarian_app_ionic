import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  answer: string = 'test answer'; //todo mock
  constructor() { }

  ngOnInit() {
  }

}
