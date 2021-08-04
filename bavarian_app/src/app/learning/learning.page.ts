import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
  image: string = 'https://www.ntb.de/wp-content/uploads/2019/11/placeholder-image-icon-21.jpg'; //todo mock
  bayrisch: string = 'servus'; //todo mock
  deutsch: string = 'hallo'; //todo mock
  constructor() { }

  ngOnInit() {
  }

}
