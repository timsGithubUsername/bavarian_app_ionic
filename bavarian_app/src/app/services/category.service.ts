import { Injectable } from '@angular/core';
import {Level} from "../../entities/Level";
import {Category} from "../../entities/Category";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private gamemode:number;
  private categoryLevelMap:Map<Level, Category[]>;
  private router:Router;

  constructor() {  }

  public setRouter(router:Router):void{
    this.router = router;
  }

  public getRouter():Router {
    return this.router;
  }

  public setGamemode(gamemode:number):void{
    this.gamemode = gamemode;
  }

  public getGamemode():number{
    return this.gamemode;
  }

  public setCategoryLevelMap(categoryLevelMap:Map<Level, Category[]>):void{
    this.categoryLevelMap = categoryLevelMap;
  }

  public getCategoryLevelMap():Map<Level, Category[]>{
    return this.categoryLevelMap;
  }
}
