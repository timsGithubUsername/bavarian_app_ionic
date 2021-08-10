import {Category, CategoryValue} from "../../../entities/Category";
import {LevelValue} from "../../../entities/Level";
import {CategoryService} from "../category.service";
import {AppInjector} from "../../app.module";
import {RoutingService} from "../routing.service";

export class ResponseCategories {
  private categoryLevelMap: Map<LevelValue, CategoryValue[]> = new Map<LevelValue, CategoryValue[]>();

  public respondAllCategories(cats: Category[]): void {
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
    this.categoryLevelMap = new Map<LevelValue, CategoryValue[]>();

    //stores the current level
    let currentLevel: LevelValue;

    //for each category..
    cats.forEach(element => {
      //.. set currentLevel..
      currentLevel = element.getLevel().getValues();

      //.. if level already exists..
      if(this.isKeyInMap(currentLevel)){
        //.. add element to array for this level, else..
        this.getFromKey(currentLevel).push(element.getValues());
      } else {
        //.. set new key-value-pair
        this.categoryLevelMap.set(currentLevel, [element.getValues()]);
      }
    });
  }

   /* *********************************************************************************** */
  /* LevelValue has no build in compare Method, so we have to do some functions on our own */
   /* *********************************************************************************** */

  /**
   * prof if a key is inside of categoryLevelMap
   * @param key the key we want to see inside
   * @private respect it!
   */
  private isKeyInMap(key: LevelValue){
    let output = false;

    //for every element proof the equality
    this.categoryLevelMap.forEach((value: CategoryValue[], keyToProof: LevelValue) => {
        output = output || key.id === keyToProof.id;
      });

    return output;
  }

  /**
   * get a value from the given key (or a empty Array if key does not exist)
   * @param key the key we want the array from
   * @private i call you one last time to respect it!
   */
  private getFromKey(key: LevelValue){
    let output = [];

    //if the key equals one key in the map set the output variable
    this.categoryLevelMap.forEach((value: CategoryValue[], keyToProof: LevelValue) => {
      if(key.id === keyToProof.id){
        output = value;
      }
    });
    return output;
  }
}
