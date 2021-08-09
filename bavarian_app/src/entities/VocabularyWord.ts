import {DialectWord} from "./DialectWord";
import {TranslationWord} from "./TranslationWord";
import {Category} from "./Category";
import {Gender} from "./Dialect";

export interface VocabularyWord {
  /**
   * Returns the ID of the vocabulary.
   */
  getId():number;

  /**
   * Returns the vocabulary in dialect.
   */
  getDialectWord():DialectWord;

  /**
   * Returns the vocabulary in High German
   */
  getGerman():string;

  /**
   * Returns the translation of the vocabulary
   */
  getTranslation():TranslationWord;

  /**
   * Returns the path of the image
   */
  getPicturePath():string;

  /**
   * Returns the category of the vocabulary.
   */
  getCategory():Category;

  /**
   * Returns the annotation of the vocabulary
   */
  getAnnotation():string;

  /**
   * Returns the values of VocabularyWord as an Object.
   */
  getValues():{
    id:number,
    dialectWord:{
      word:string,
      dialect:{
        name:string,
        color:number,
        gender:Gender,
        info:string
      },
      pronunciationPath:string
    },
    german:string,
    translationWord:{
      word:string,
      language:{
        word:string,
        iconPath:string
      }
    },
    picturePath:string,
    category:{
      name:string,
      iconPath:string,
      level:{
        id:number,
        iconPath:string
      }
    },
    annotation:string
  };
}

export interface VocabularyWordMutable extends VocabularyWord{


  /**
   * Set the word in the dialect of the vocabulary.
   * @param word - The word to be set
   */
  setDialectWord(word:DialectWord):void;

  /**
   * Puts the vocabulary word into High German
   * @param word - The word to be set
   */
  setGerman(word:string):void;

  /**
   * Sets the translation of the vocabulary
   * @param word - The word to be set
   */
  setTranslation(word:TranslationWord):void;

  /**
   * Sets the path of the image
   * @param path - Path of an image
   */
  setPicturePath(path:string):void;

  /**
   * Sets the category of the vocabulary
   * @param cat - New category
   */
  setCategory(cat:Category):void;

  /**
   * Sets the annotation of the vocabulary
   * @param a - The note to be set
   */
  setAnnotation(a:string):void;

}
