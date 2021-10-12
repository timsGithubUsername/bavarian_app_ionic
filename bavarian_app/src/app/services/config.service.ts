import { Injectable } from '@angular/core';
import {Dialect} from "../../entities/Dialect";
import {Language} from "../../entities/Language";
import {AppInjector} from "../app.module";
import {ControllerService} from "./controller/controller.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  dialects:Dialect[];
  translations:Language[];

  currentDialect:Dialect;
  currenLanguage:Language;

  constructor() { }

  /**
   * This method updates all fields of this service based on the database
   */
  refresh(){
    AppInjector.get(ControllerService).requestAllDialects();
    AppInjector.get(ControllerService).requestAllLanguages();
    AppInjector.get(ControllerService).requestDialect();
    AppInjector.get(ControllerService).requestLanguage();
  }

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
  setCurrentDialect(d:Dialect):void{
    this.currentDialect = d;
  }
  getCurrentDialect():Dialect{
    return this.currentDialect;
  }
  setCurrentLanguage(l:Language){
    this.currenLanguage = l;
  }
  getCurrentLanguage():Language{
    return this.currenLanguage;
  }
}
