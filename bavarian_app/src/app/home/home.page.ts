import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  constructor(private router: Router) {
  }

  //request array of vocable elements for lecture
  //todo this is for core, this should be modified later to request list of lectures!
  requestLearning(){
    //todo request lesson and remove function call below
    this.responseLearning();
  }
  //get array of elements and redirect
  //todo get array of vocable elements
  //todo this is for core, this should be modified later to get array of lectures!
  responseLearning(){
    this.router.navigate(['learning'])
  }

  //request array of vocable elements for test
  //todo this is for core, this should be modified later to request list of tests!
  requestTest(){
    //todo request lesson and remove function call below
    this.responseTest();
  }
  //get array of elements and redirect
  //todo get array of vocable elements
  //todo this is for core, this should be modified later to get array of lectures!
  responseTest(){
    this.router.navigate(['quiz'])
  }
}
