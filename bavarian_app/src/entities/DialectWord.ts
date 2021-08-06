import {Dialect} from "./Dialect.js";

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
