import {Dialect, DialectValue} from "./Dialect";

export interface DialectWord{

  /**
   * Returns the word
   */
  getWord():string;

  /**
   * Returns the dialect of the word
   */
  getDialect():Dialect;

  /**
   * Returns the path of the sound file with the pronunciation of the word
   */
  getPronunciationPath():string;

  /**
   * Returns the values of DialectWord as an Object.
   */
  getValues():DialectWordValue;

}

export interface DialectWordValue{
  word:string,
  dialect:DialectValue,
  pronunciationPath:string
}

export interface DialectWordMutable extends DialectWord{

  /**
   * Sets the word
   * @param w
   */
  setWord(w:string):void;

  /**
   * Sets the dialect of the word
   * @param d
   */
  setDialect(d:Dialect):void;

  /**
   * Sets the path of the sound file with the pronunciation of the word
   * @param path
   */
  setPronunciationPath(path:string):void;

}
