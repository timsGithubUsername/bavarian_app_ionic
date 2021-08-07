import {DialectMutable, Gender} from "../Dialect.js";

export interface DialectFactory {

  create(name:string,color:number,gender:Gender,info:string):DialectMutable;

}
