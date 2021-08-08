import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {Controller} from "../controller/Controller";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  constructor(private router: Router, private categoryService: CategoryService) {
  }

  //request array of vocable elements for lecture
  requestCategories(mode: number){
    this.categoryService.setGamemode(mode);
    this.categoryService.setRouter(this.router);
    Controller.requestAllCategories();
  }
  //get array of elements and redirect
  //todo get array of vocable elements
  //todo this is for core, this should be modified later to get array of lectures!
  responseCategories(){
    this.router.navigate(['learning'])
  }

}
