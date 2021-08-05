export interface Dialect{

  getName():string;

  setName(name:string):void;

  getColor():number;

  setColor(color:number):void;

  getGender():Gender;

  setGender(gender:Gender):void;

  getInfo():string;

  setInfo():string;

}

export enum Gender{

  FEMALE,
  MALE

}
