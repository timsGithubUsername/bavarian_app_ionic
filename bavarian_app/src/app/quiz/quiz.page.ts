import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {QuizWord} from "../../entities/QuizWord";
import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {RoutingService} from "../services/routing.service";
import {ControllerService} from "../services/controller/controller.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  answerCorrect: boolean = false;
  isGameComplete: boolean = false;
  ngForIndex: number;
  progressBarProgress: number;
  numberOfQuizWords: number;
  quiz: Quiz = null;
  quizWords: QuizWord[] = [];

  constructor(private categoryService: CategoryService,
              private alertCtrl: AlertController,
              private translate: TranslateService,
              private router: Router,
              private routingService: RoutingService,
              private controller: ControllerService) {
    this.quiz = categoryService.getQuiz();
    try{
      this.quizWords = this.quiz.quizWords;
      this.numberOfQuizWords = this.quiz.quizWords.length;
    } catch (e) {
      console.log(e);
      console.log("Can't access quiz from CategoryService in quiz.page. Do you loaded the app on this page?");
    }
  }

  ngOnInit() {
  }

  buildTranslationWord(vocWord: VocabularyWord): string {
    let output = "";

    //if translation word is not undefined
    if (typeof vocWord.translationWord !== undefined) {
      output = output + vocWord.translationWord;
    }

    //if length is zero return undefined
    if (output === "") {
      return 'undefined';
    }
    //else return string
    else {
      return output;
    }
  }

  /**
   * navigate to next slide
   * @param slide the slider element
   */
  nextSlide(slide) {
    slide.slideNext();
  }

  /**
   * set the answerCorrect bool and trigger next slide
   */
  isAnswerCorrect(indexOfAnswer: number, quizWord: QuizWord, slide) {
    this.answerCorrect = quizWord.testAnswer(quizWord.answerOptions[indexOfAnswer]);
    this.nextSlide(slide);
  }

  /**
   * calculate the progress of the progress bar, uses numberOfVocabularyWords
   * @param i current index
   */
  buildProgressBar(i: number): string {
    //set the current index of the slides
    this.ngForIndex = i + 1;
    //calculate the progress and set the value
    this.progressBarProgress = this.ngForIndex / this.numberOfQuizWords;
    //return the string to show
    return this.ngForIndex + "/" + this.numberOfQuizWords;
  }

  /**
   * Custom Back button for this game. the game is not counted if it has not been played through.
   *
   */
  onBackButton() {
    this.alertCtrl.create({
      header: this.translate.instant("TEST.ALRT_HEAD"),
      message: this.translate.instant("TEST.ALRT_MSG"),
      buttons: [{
        text: this.translate.instant("TEST.ALRT_CANCEL_BTN"),
        role: "cancel"
      }, {
        text: this.translate.instant("TEST.ALRT_AGREE_BTN"),
        handler: () => {
          this.directToHome();
        }
      }]
    }).then(alertEL => {
      alertEL.present();
    });
  }

  /**
   * navigate to first slide
   * @param slide the slider element
   */
  slideToFirst(slide){
    slide.slideTo(0);
  }

  /**
   * go to categories page.
   * @param mode the number wich representing the mode. 0 with learning entry, 1 with quiz entry
   */
  requestCategories(mode: number){
    //set mode in category service
    this.categoryService.setGamemode(mode);
    //set router in router service
    //not realy neccessary here, this should be set before - but we dont know what users do with this app
    this.routingService.setRouter(this.router);
    //send request
    this.controller.requestAllCategories();
  }

  /**
   * navigate to home page
   */
  directToHome(){
    this.router.navigate(['home'])
  }
}
