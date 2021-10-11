import {Level} from "./Level";

export interface Category{

  /**
   * Returns the id of the category
   */
  readonly id:number;

  /**
   * Returns the name of the category
   */
  readonly name:string;

  /**
   * Returns the path of the category icon
   */
  readonly iconPath:string;

  /**
   * Returns the level of the category
   */
  readonly level:Level;

}

export interface CategoryMutable extends Category{

  /**
   * Sets the name of the category
   * @param name
   */
  setName(name:string):void;

  /**
   * Sets the path of the category icon
   */
  setIconPath(path:string):void;

  /**
   * Sets the level of the category
   * @param level
   */
  setLevel(level:Level):void;

}
