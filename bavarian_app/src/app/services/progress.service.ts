import { Injectable } from '@angular/core';
import {Quiz} from "../../entities/Quiz";
import {AppInjector} from "../app.module";
import {CategoryService} from "./category.service";
import {Level} from "../../entities/Level";
import {Category} from "../../entities/Category";
import {ControllerService} from "./controller/controller.service";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  currentArchievment:number;

  constructor(private controllerService:ControllerService) { }


}
