import {DialectWordMutable} from "../DialectWord";
import {Dialect} from "../Dialect";

export interface DialectWordFactory {

  createDialectWord(word:string,dialect:Dialect,pronunciationPath:string):DialectWordMutable;

}
