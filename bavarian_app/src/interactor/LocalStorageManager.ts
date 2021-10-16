import {Language} from "../entities/Language";
import {Dialect} from "../entities/Dialect";
import {ProgressType} from "./InteractorRequester";
import {Category} from "../entities/Category";

export interface LocalStorageManager{

  saveLanguage(lang:string):void;
  loadLanguage():string;

  saveDialect(dial:string):void;
  loadDialect():string;

  saveAchievement(key:string):void;
  deleteAchievement(key:string):void;
  testAchievement(key:string):boolean;

  saveProgress(type:ProgressType,cat:Category,value:number):void;
  loadProgress(type:ProgressType,cat:Category):number;
  existProgress(type:ProgressType,cat:Category):boolean;
  deleteProgress(type:ProgressType,cat:Category):void;

  clear():void;

}
