export interface Language {

  /**
   * Returns the name of the language
   */
  getName():string;

  /**
   * Returns the path of the icon of the language
   */
  getIconPath():string;

  /**
   * Returns the values of Language as an Object.
   */
  getValues():LanguageValue;
}

export interface LanguageValue{
  word:string,
  iconPath:string
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
