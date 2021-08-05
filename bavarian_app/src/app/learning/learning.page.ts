import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  bayrisch: string = 'servus'; //todo mock
  deutsch: string = 'hallo'; //todo mock
  count: string = '8/12'; //todo mock
  constructor() { }

  ngOnInit() {
  }

}
