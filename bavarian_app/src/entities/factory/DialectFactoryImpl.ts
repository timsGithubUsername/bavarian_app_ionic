import {DialectFactory} from "./DialectFactory";
import {DialectMutable, DialectValue, Gender} from "../Dialect";

export class DialectFactoryImpl implements DialectFactory{

  create(name: string, color: number, gender: Gender, info: string): DialectMutable {
    return new DialectImpl(name,color,gender,info);
  }

}

class DialectImpl implements DialectMutable {
  private name:string;
  private color:number;
  private gender:Gender;
  private info:string;

  constructor(name:string,color:number,gender:Gender,info:string) {
    this.setName(name);
    this.setColor(color);
    this.setGender(gender);
    this.setInfo(info);
  }

  /**
   * Returns the colour value of the dialect
   */
  getColor(): number {
    return this.color;
  }

  /**
   * Gives the gender of the reader from the dialect
   */
  getGender(): Gender {
    return this.gender;
  }

  /**
   * Returns an info about the dialect
   */
  getInfo(): string {
    return this.info;
  }

  /**
   * Returns the name of the dialect
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the colour value of the dialect
   * @param color
   */
  setColor(color: number): void {
    this.color = color;
  }

  /**
   * Sets the gender of the reader from the dialect
   * @param gender
   */
  setGender(gender: Gender): void {
    this.gender = gender;
  }

  /**
   * Sets an info about the dialect
   */
  setInfo(info: string): void {
    this.info = info;
  }

  /**
   * Sets the name of the dialect
   * @param name
   */
  setName(name: string): void {
    this.name = name;
  }

  getValues(): DialectValue {
    return {
      color: this.getColor(),
      gender: this.getGender(),
      info: this.getInfo(),
      name: this.getName()
    };
  }

}
