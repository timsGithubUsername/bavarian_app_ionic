import {InteractorResponseCategories} from "../../interactor/InteractorResponse";
import {Category} from "../../entities/Category";
import {Level} from "../../entities/Level";

export class ResponseCategoriesImpl implements InteractorResponseCategories{
  private categoryLevelMap: Map<Level, Category[]>;

  respondAllCategories(cats: Category[]): void {
    this.buildCategoryLevelMap(cats);
  }

  /**
   * Build the Map over level to Categories with given Categories-Array
   * @param cats The given Array
   * @private respect my privacy
   */
  private buildCategoryLevelMap(cats: Category[]){
    //stores the current level
    let currentLevel: Level;

    //for each category..
    cats.forEach(element => {
      //.. set currentLevel..
      currentLevel = element.getLevel();

      //.. if level already exists..
      if(this.categoryLevelMap.has(currentLevel)){
        //.. add element to array for this level, else..
        this.categoryLevelMap.get(currentLevel).push(element);
      } else {
        //.. set new key-value-pair
        this.categoryLevelMap.set(currentLevel, [element]);
      }
    });
  }
}
