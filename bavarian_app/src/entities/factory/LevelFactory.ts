import {LevelMutable} from "../Level.js";

export interface LevelFactory {

  createLevel(id:number,iconPath:string):LevelMutable;

}

