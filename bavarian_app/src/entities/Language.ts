export interface Language {

  /**
   * Returns the name of the language
   */
  readonly name:string;

  /**
   * Returns the path of the icon of the language
   */
  readonly iconPath:string;

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
