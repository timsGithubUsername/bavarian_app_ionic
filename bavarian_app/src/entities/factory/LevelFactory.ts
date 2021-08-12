import {LevelMutable} from "../Level";
import {Category} from "../Category";

export interface LevelFactory {

  createLevel(id:number,iconPath:string,categories:Category[]):LevelMutable;

}

