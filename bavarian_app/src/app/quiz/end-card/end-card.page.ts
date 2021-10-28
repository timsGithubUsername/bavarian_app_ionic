import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {RoutingService} from "../../services/routing.service";
import {ControllerService} from "../../services/controller/controller.service";

@Component({
  selector: 'app-end-card',
  templateUrl: './end-card.page.html',
  styleUrls: ['./end-card.page.scss'],
})
export class EndCardPage implements OnInit {

  constructor(private categoryService: CategoryService,
              private router: Router,
              private routingService: RoutingService,
              private controller: ControllerService) { }

  ngOnInit() {
  }

  /**
   * go to categories page.
   * @param mode the number wich representing the mode. 0 with learning entry, 1 with quiz entry
   */
  requestCategories(mode: number){
    //set mode in category service
    this.categoryService.setGamemode(mode);
    //set router in router service
    //not realy neccessary here, this should be set before - but we dont know what users do with this app
    this.routingService.setRouter(this.router);
    //send request
    this.controller.requestAllCategories();
  }

  again(){
    this.controller.requestQuizAndRedirect(this.categoryService.getCategory());
  }

  /**
   * navigate to home page
   */
  directToHome(){
    this.router.navigate(['home'])
  }
}
