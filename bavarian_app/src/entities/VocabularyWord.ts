import {DialectWord, DialectWordValue} from "./DialectWord";
import {TranslationWord, TranslationWordValue} from "./TranslationWord";
import {Category, CategoryValue} from "./Category";

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
  getValues():VocabularyWordValue;
}

export interface VocabularyWordValue{
  id:number,
  dialectWord:DialectWordValue,
  german:string,
  translationWord:TranslationWordValue,
  picturePath:string,
  category:CategoryValue,
  annotation:string
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
