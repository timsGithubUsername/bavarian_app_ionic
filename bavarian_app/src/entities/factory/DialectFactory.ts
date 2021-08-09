import {DialectMutable, Gender} from "../Dialect";

export interface DialectFactory {

  create(name:string,color:number,gender:Gender,info:string):DialectMutable;

}
