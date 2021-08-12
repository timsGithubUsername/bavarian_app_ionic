import {Category, CategoryMutable} from "./Category";

export interface Level {

  /**
   * Returns the number of the level
   */
  readonly id:number;

  /**
   * Returns the path of the icon of the level
   */
  readonly iconPath:string;


  /**
   * Returns all Categories which correspond to this level
   */
  readonly categories:Category[];

}

export interface LevelMutable extends Level {

  /**
   * Sets the number of the level
   * @param id
   */
  setId(id:number):void;

  /**
   * Sets the path of the icon of the level
   * @param path
   */
  setIconPath(path:string):void;

  /**
   * Sets all Categories which correspond to this level
   * @param categories
   */
  setCategories(categories:CategoryMutable[]):void;

  /**
   * Add a new Category to the Level
   * @param category
   */
  addCategory(category:CategoryMutable):void;

}
