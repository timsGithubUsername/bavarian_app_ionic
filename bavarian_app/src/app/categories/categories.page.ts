import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Level} from "../../entities/Level";
import {Category} from "../../entities/Category";
import {RoutingService} from "../services/routing.service";
import {ControllerService} from "../services/controller/controller.service";
import {ProgressService} from "../services/progress.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  //in which mode this page is opened. 0: learning, 1: quiz
  mode: number;
  levels: Level[];

  constructor(private categoryService: CategoryService,
              private routingService: RoutingService,
              private controllerService: ControllerService,
              private progressService: ProgressService) {
  }

  ngOnInit() {
  }
  //called every time this page is entered - even if it is already instantiated
  ionViewWillEnter(){

    this.mode = this.categoryService.getGamemode();
    this.levels = this.categoryService.getLevels();
    this.progressService.updateProgress();
    console.log(this.progressService.currentLevel)
  }

  /**
   * check if the given level is the current or less
   */
  checkLevel(lvl:Level){
    return lvl.id <= this.progressService.currentLevel;
  }

  /**
   * get all categories from one level
   * @param lvl the level
   */
  getCategoriesFromLevel(lvl:Level):Category[]{
    return lvl.categories;
  }

  /**
   * Proof if a category is learned or the quiz is better then 90%
   * @param category
   */
  setCheckMark(category:Category){
    let output = false;

    switch (this.mode) {
      case 0 : {
        //learning
        this.progressService.studyProgress.forEach((val:number, cat:Category) => {
          if(cat.id === category.id && val === 1) {
            output = true;
          }
        });
        break;
      }
      case 1 : {
        //quiz
        this.progressService.quizProgress.forEach((val:number, cat:Category) => {
          if(cat.id === category.id && val >= 0.9) {
            output = true;
          }
        });
        break;
      }
    }
    return output;
  }

  /**
   * start desired gamemode for the clicked category
   * @param category Category on which is clicked
   */
  chooseCategory(category: Category){
    switch (this.mode) {
      case 0 : {
        //learning
        this.controllerService.requestStudyAndRedirect(category);
        break;
      }
      case 1 : {
        //quiz
        this.controllerService.requestQuizAndRedirect(category);
        break;

      }
      default : {
        this.routingService.getRouter().navigate(['home']);
      }
    }
  }
  /**
   * navigate to home page
   */
  directToHome(){
    this.routingService.getRouter().navigate(['home'])
  }
}


