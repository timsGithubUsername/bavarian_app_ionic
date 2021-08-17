import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Level} from "../../entities/Level";
import {Category} from "../../entities/Category";
import {RoutingService} from "../services/routing.service";
import {ControllerService} from "../services/controller/controller.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  //in which mode this page is opened. 0: learning, 1: quiz
  mode: number;
  levels: Level[];

  constructor(private categoryService: CategoryService,
              private routingService: RoutingService,
              private controllerService: ControllerService) {
  }

  ngOnInit() {
  }

  //called every time this page is entered - even if it is already instantiated
  ionViewWillEnter(){
    this.mode = this.categoryService.getGamemode();
    this.levels = this.categoryService.getLevels();
  }

  /**
   * get all categories from one level
   * @param lvl the level
   */
  getCategoriesFromLevel(lvl:Level):Category[]{
    return lvl.categories;
  }

  /**
   * start desired gamemode for the clicked category
   * @param category Category on which is clicked
   */
  chooseCategory(category: Category){
    switch (this.mode) {
      case 0 : {
        //learning
        this.controllerService.requestStudy(category);
        break;
      }
      case 1 : {
        //quiz
        this.controllerService.requestQuiz(category);
        break;

      }
      default : {
        this.routingService.getRouter().navigate(['home']);
      }
    }
  }
}


