import {Level} from "./Level.js";

export interface Category{

  getName():string;

  setName(name:string):void;

  getIconPath():string;

  setIconPath():string;

  getLevel():Level;

  setLevel(level:Level):void;

}
