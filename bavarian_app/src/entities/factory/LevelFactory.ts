import {LevelMutable} from "../Level";

export interface LevelFactory {

  createLevel(id:number,iconPath:string):LevelMutable;

}

