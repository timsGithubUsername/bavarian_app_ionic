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
    this.updateQuizAndStudy();
    this.checkLevelProgress();
    this.checkLevel();
  }

  resetProgress(){
    this.currentLevel = 1;
    this.updateQuizAndStudy();
  }

  setQuizProgress(qp:Map<Category,number>){
    this.quizProgress = qp;
  }
  setStudyProgress(sp:Map<Category,number>){
    this.studyProgress = sp;
  }
  private checkLevelProgress(){
    this.currentLevel = 1;

    let allQuizesPassed = true;

    this.quizProgress.forEach((val:number, cat:Category) => {
      if(cat.level.id === this.currentLevel){
        console.log(val);
        console.log(allQuizesPassed && val >= 0.9);
        allQuizesPassed = allQuizesPassed && val >= 0.9;
      }
    });

    if(allQuizesPassed) this.addArchivement(this.currentLevel);
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
    this.currentLevel = 1;

    for(let a in Archivements){
      if(this.controllerService.getArchivement(Archivements[a])){
        this.currentLevel++;
      }
    }
  }

  /**
   * adds an archieved archievement
   * @param a the archived archivement
   */
  private addArchivement(level:number){
    switch (level){
      case 1: {
        this.controllerService.setArchivement(Archivements.A1);
        break;
      }
      case 2: {
        this.controllerService.setArchivement(Archivements.A2);
        break;
      }
      case 3: {
        this.controllerService.setArchivement(Archivements.A3);
        break;
      }
      case 4: {
        this.controllerService.setArchivement(Archivements.A4);
        break;
      }
      case 5: {
        this.controllerService.setArchivement(Archivements.A5);
        break;
      }
      case 6: {
        this.controllerService.setArchivement(Archivements.A6);
        break;
      }
      case 7: {
        this.controllerService.setArchivement(Archivements.A7);
        break;
      }
      case 8: {
        this.controllerService.setArchivement(Archivements.A8);
        break;
      }
    }
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
