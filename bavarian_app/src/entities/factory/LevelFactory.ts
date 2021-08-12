import {LevelMutable} from "../Level";
import {CategoryMutable} from "../Category";

export interface LevelFactory {

  createLevel(id:number,iconPath:string,categories:CategoryMutable[]):LevelMutable;

}

