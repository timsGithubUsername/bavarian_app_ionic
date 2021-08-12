import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Level} from "../../entities/Level";
import {Category} from "../../entities/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  //in which mode this page is opened. 0: learning, 1: quiz
  mode: number;
  levels: Level[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
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

}


