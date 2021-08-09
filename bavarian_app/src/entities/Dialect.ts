export interface Dialect{

  /**
   * Returns the name of the dialect
   */
  getName():string;

  /**
   * Returns the colour value of the dialect
   */
  getColor():number;

  /**
   * Gives the gender of the reader from the dialect
   */
  getGender():Gender;

  /**
   * Returns an info about the dialect
   */
  getInfo():string;

  /**
   * Returns the values of Dialect as an Object
   */
  getValues():DialectValue

}

export interface DialectValue{
  name:string,
  color:number,
  gender:Gender,
  info:string
}

export interface DialectMutable extends Dialect{

  /**
   * Sets the name of the dialect
   * @param name
   */
  setName(name:string):void;

  /**
   * Sets the colour value of the dialect
   * @param color
   */
  setColor(color:number):void;

  /**
   * Sets the gender of the reader from the dialect
   * @param gender
   */
  setGender(gender:Gender):void;

  /**
   * Sets an info about the dialect
   */
  setInfo(info:string):void;
}

export enum Gender{
  FEMALE,
  MALE
}
