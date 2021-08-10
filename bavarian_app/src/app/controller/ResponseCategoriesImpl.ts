import {Category, CategoryValue} from "../../entities/Category";
import {LevelValue} from "../../entities/Level";
import {CategoryService} from "../services/category.service";
import {AppInjector} from "../app.module";
import {RoutingService} from "../services/routing.service";

export class ResponseCategoriesImpl{
  private categoryLevelMap: Map<LevelValue, CategoryValue[]>;

  respondAllCategories(cats: Category[]): void {
    //build the map
    this.buildCategoryLevelMap(cats);
    //get service and set map
    AppInjector.get(CategoryService).setCategoryLevelMap(this.categoryLevelMap);

    //fin: get service and route to categories
    AppInjector.get(RoutingService).getRouter().navigate(['categories'])
  }

  /**
   * Build the Map over level to Categories with given Categories-Array
   * @param cats The given Array
   * @private respect my privacy
   */
  private buildCategoryLevelMap(cats: Category[]){

    //stores the current level
    let currentLevel: LevelValue;

    //for each category..
    cats.forEach(element => {
      //.. set currentLevel..
      currentLevel = element.getLevel().getValues();

      //.. if level already exists..
      if(this.categoryLevelMap.has(currentLevel)){
        //.. add element to array for this level, else..
        this.categoryLevelMap.get(currentLevel).push(element.getValues());
      } else {
        //.. set new key-value-pair
        this.categoryLevelMap.set(currentLevel, [element.getValues()]);
      }
    });
  }
}
