export interface Level {

  /**
   * Returns the number of the level
   */
  getId():number;

  /**
   * Returns the path of the icon of the level
   */
  getIconPath():string;

  /**
   * Returns the values of Level as an Object.
   */
  getValues():LevelValue;
}

export interface LevelValue{
  id:number,
  iconPath
}

export interface LevelMutable extends Level {

  /**
   * Sets the number of the level
   */
  setId(id:number):void;

  /**
   * Sets the path of the icon of the level
   * @param path
   */
  setIconPath(path:string):void;

}
