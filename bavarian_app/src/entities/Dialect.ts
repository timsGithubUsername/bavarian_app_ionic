export interface Dialect{

  /**
   * Returns the name of the dialect_old
   */
  readonly name:string;

  /**
   * Returns the colour value of the dialect_old
   */
  readonly color:number;

  /**
   * Gives the gender of the reader from the dialect_old
   */
  readonly gender:Gender;

  /**
   * Returns an info about the dialect_old
   */
  readonly info:string;


}

export interface DialectMutable extends Dialect{

  /**
   * Sets the name of the dialect_old
   * @param name
   */
  setName(name:string):void;

  /**
   * Sets the colour value of the dialect_old
   * @param color
   */
  setColor(color:number):void;

  /**
   * Sets the gender of the reader from the dialect_old
   * @param gender
   */
  setGender(gender:Gender):void;

  /**
   * Sets an info about the dialect_old
   */
  setInfo(info:string):void;
}

export enum Gender{
  FEMALE,
  MALE
}
