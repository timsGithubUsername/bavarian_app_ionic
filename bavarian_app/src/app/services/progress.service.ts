import { Injectable } from '@angular/core';
import {ControllerService} from "./controller/controller.service";
import {Category} from "../../entities/Category";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  quizProgress:Map<Category,number> = new Map<Category, number>();
  studyProgress:Map<Category,number> = new Map<Category, number>();
  currentLevel:number;

  constructor(private controllerService:ControllerService) {
    this.currentLevel = 1;

    this.updateProgress();
  }

  updateProgress(){
    this.checkLevel();
    this.updateQuizAndStudy();
  }

  setQuizProgress(qp:Map<Category,number>){
    this.quizProgress = qp;
  }
  setStudyProgress(sp:Map<Category,number>){
    this.studyProgress = sp;
  }
  private updateQuizAndStudy(){
    this.controllerService.requestStudyProgress();
    this.controllerService.requestQuizProgress();
  }
  /**
   * Checks if a level is archived
   * @private
   */
  private checkLevel(){
    for(let a in Archivements){
      if(this.controllerService.getArchivement(a)){
        this.currentLevel++;
      }
    }
  }

  /**
   * adds an archieved archievement
   * @param a the archived archivement
   */
  addArchivement(a:Archivements){
    this.controllerService.setArchivement(a);
    this.checkLevel();
  }
}
export enum Archivements{
  A1 = "a1",
  A2 = "a2",
  A3 = "a3",
  A4 = "a4",
  A5 = "a5",
  A6 = "a6",
  A7 = "a7",
  A8 = "a8"
}
