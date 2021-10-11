import { Injectable } from '@angular/core';
import {Dialect} from "../../entities/Dialect";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  dialects:Dialect[];

  constructor() { }

  setDialects(d:Dialect[]):void{
    this.dialects = d;
  }
  getDialects():Dialect[]{
    return this.dialects;
  }
}
