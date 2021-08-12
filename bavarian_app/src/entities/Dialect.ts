export interface Dialect{

  /**
   * Returns the name of the dialect
   */
  readonly name:string;

  /**
   * Returns the colour value of the dialect
   */
  readonly color:number;

  /**
   * Gives the gender of the reader from the dialect
   */
  readonly gender:Gender;

  /**
   * Returns an info about the dialect
   */
  readonly info:string;


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
