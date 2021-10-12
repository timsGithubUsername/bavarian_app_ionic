import { Injectable } from '@angular/core';
import {Dialect} from "../../entities/Dialect";
import {Language} from "../../entities/Language";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  dialects:Dialect[];
  translations:Language[];

  constructor() { }

  setDialects(d:Dialect[]):void{
    this.dialects = d;
  }
  getDialects():Dialect[] {
    return this.dialects;
  }
  setTranslations(l:Language[]):void{
    this.translations = l
  }
  getTranslations():Language[]{
    return this.translations;
  }
}
