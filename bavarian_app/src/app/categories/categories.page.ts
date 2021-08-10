import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {CategoryValue} from "../../entities/Category";
import {LevelValue} from "../../entities/Level";
import {ControllerService} from "../services/controller/controller.service";
import {RoutingService} from "../services/routing.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  //in which mode this page is opened. 0: learning, 1: quiz
  mode: number;
  categoryLevelMap: Map<LevelValue, CategoryValue[]>;

  constructor(private categoryService: CategoryService, private controller: ControllerService, private routingService: RoutingService) { }

  ngOnInit() {
    this.mode = this.categoryService.getGamemode();
    this.categoryLevelMap = this.categoryService.getCategoryLevelMap();
  }

  /**
   * get all levels from Map and sort them by id
   */
  getCategoryLevels():LevelValue[]{
    //get levels
    let keys = Array.from(this.categoryLevelMap.keys());
    //sort them
    keys.sort((a, b) => a.id - b.id);

    return keys;
  }

  /**
   * get all categories from one level
   * @param lvl the level
   */
  getCategoriesFromLevel(lvl:LevelValue):CategoryValue[]{
    return this.categoryLevelMap.get(lvl);
  }

  chooseCategory(categoryValue: CategoryValue){
    switch(this.categoryService.getGamemode()){
      case 0: {
        this.controller.requestStudy(categoryValue.category);
        break;
      }
      case 1: {
        this.controller.requestQuiz(categoryValue.category);
        break;
      }
      default: {
        this.routingService.getRouter().navigate(['home'])
        break;
      }
    }
  }
}


