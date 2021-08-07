import {Level} from "./Level.js";

export interface Category{

  /**
   * Returns the name of the category
   */
  getName():string;

  /**
   * Returns the path of the category icon
   */
  getIconPath():string;

  /**
   * Returns the level of the category
   */
  getLevel():Level;

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