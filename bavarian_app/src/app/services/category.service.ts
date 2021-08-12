import { Injectable } from '@angular/core';
import {Level} from "../../entities/Level";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private gamemode:number;
  private levels: Level[];

  constructor() {
    this.gamemode = -1;
    this.levels = [];
  }

  public setGamemode(gamemode:number):void{
    this.gamemode = gamemode;
  }

  public getGamemode():number{
    return this.gamemode;
  }

  public setLevels(levels: Level[]):void{
    this.levels = levels;
    this.sortLevels();
  }

  public getLevels():Level[]{
    return this.levels;
  }

  private sortLevels(){
    this.levels.sort((level1:Level, level2:Level) => level1.id - level2.id);
  }
}
