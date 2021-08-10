import { Injectable } from '@angular/core';
import {LevelValue} from "../../entities/Level";
import {CategoryValue} from "../../entities/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private gamemode:number;
  private categoryLevelMap:Map<LevelValue, CategoryValue[]>;

  constructor() {  }

  public setGamemode(gamemode:number):void{
    this.gamemode = gamemode;
  }

  public getGamemode():number{
    return this.gamemode;
  }

  public setCategoryLevelMap(categoryLevelMap:Map<LevelValue, CategoryValue[]>):void{
    this.categoryLevelMap = categoryLevelMap;
  }

  public getCategoryLevelMap():Map<LevelValue, CategoryValue[]>{
    return this.categoryLevelMap;
  }
}
