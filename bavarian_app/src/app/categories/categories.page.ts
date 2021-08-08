import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Category} from "../../entities/Category";
import {Level} from "../../entities/Level";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  //in which mode this page is opened. 0: learning, 1: quiz
  mode: number;
  categoryLevelMap: Map<Level, Category[]>;


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.mode = this.categoryService.getGamemode();
    this.categoryLevelMap = this.categoryService.getCategoryLevelMap();
  }

  /**
   * get all levels from Map and sort them by id
   */
  getCategoryLevels():Level[]{
    //get levels
    let keys = Array.from(this.categoryLevelMap.keys());
    //sort them
    keys.sort((a, b) => a.getId() - b.getId());

    return keys;
  }

  /**
   * get all categories from one level
   * @param lvl the level
   */
  getCategoriesFromLevel(lvl:Level):Category[]{
    return this.categoryLevelMap.get(lvl);
  }

  getIdFromLevel(lvl:Level){
    return lvl.getId();
  }

  getNameFromCategory(cat:Category){
    return cat.getName();
  }

  getIconPathFromCategory(cat:Category){
    return cat.getIconPath();
  }
}


