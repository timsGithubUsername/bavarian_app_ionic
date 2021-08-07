export interface Language {

  /**
   * Returns the name of the language
   */
  getName():string;

  /**
   * Returns the path of the icon of the language
   */
  getIconPath():string;

}

export interface LanguageMutable extends Language{

  /**
   * Sets the name of the language
   * @param name - name of the language
   */
  setName(name:string):void;

  /**
   * Sets the path of the icon of the language
   * @param path
   */
  setIconPath(path:string):void;

}
