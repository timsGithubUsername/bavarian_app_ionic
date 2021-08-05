import {DialectWord} from "./DialectWord.js";
import {TranslationWord} from "./TranslationWord.js";
import {Category} from "./Category.js";

export interface VocabularyWord {

  getId():number;

  setId(id:number):void;

  getDialectWord():DialectWord;

  setDialectWord(word:DialectWord):void;

  getGerman():string;

  setGerman(w:string):void;

  getTranslation():TranslationWord;

  setTranslation(w:TranslationWord):void;

  getPicturePath():string;

  setPicturPath():string;

  getCategory():Category;

  setCategory(cat:Category):void;

  getDescription():string;

  setDescription(desc:string):void;


}
