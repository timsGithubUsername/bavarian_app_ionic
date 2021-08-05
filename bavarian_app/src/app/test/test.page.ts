import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  answer: string = 'test answer'; //todo mock
  constructor() { }

  ngOnInit() {
  }

}
