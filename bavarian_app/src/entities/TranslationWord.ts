import {Language} from "./Language";

export interface TranslationWord {

  /**
   * Returns the translation
   */
  getWord():string;

  /**
   * Returns the language of the translation
   */
  getLanguage():Language;

  /**
   * Returns the values of TranslationWord as an Object.
   */
  getValues():{
    word:string,
    language:{
      word:string,
      iconPath:string
    }
  };
}

export interface TranslationWordMutable extends TranslationWord{

  /**
   * Sets the translation
   * @param w - Translation as string
   */
  setWord(w:string):void;

  /**
   * Sets the Language of the translation
   * @param l Language of the translation
   */
  setLanguage(l:Language):void;

}
