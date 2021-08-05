import {Dialect} from "./Dialect.js";

export interface DialectWord{

  getWord():string;

  setWord(w:string):void;

  setDialect(d:Dialect):void;

  getDialect():Dialect;

  getPronunciationPath():string;

  setPronunciationPath(path:string):void;
}
