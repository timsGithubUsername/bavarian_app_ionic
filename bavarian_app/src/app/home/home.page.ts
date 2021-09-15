import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {RoutingService} from "../services/routing.service";
import {ControllerService} from "../services/controller/controller.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  constructor(private router: Router,
              private categoryService: CategoryService,
              private routingService: RoutingService,
              private controller: ControllerService) {
    this.routingService.setRouter(this.router);
  }

  //request array of vocable elements for lecture
  requestCategories(mode: number){
    this.categoryService.setGamemode(mode);
    this.controller.requestAllCategories();
  }

  /*
  MENU BUTTONS
   */
  /**
   * direct to the settings for translation
   */
  directToTranslateSelection(){
    this.routingService.getRouter().navigate(['translation']);
  }
  /**
   * direct to the settings for dialect
   */
  directToDialectSelection(){
    this.routingService.getRouter().navigate(['dialect']);
  }  /**
   * direct to the achievements
   */
  directToAchievementsSelection(){
    this.routingService.getRouter().navigate(['achievments']);
  }
}
