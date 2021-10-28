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
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})

export class QuizPage implements OnInit {
  answerColorArray: string[] = ["primary", "primary", "primary", "primary"];
  buttonsActive: boolean = true;
  answerCorrect: boolean = false; //tests if the choosen answer is correct - indikator for the text on the next slide
  ngForIndex: number; //index of the current slide - for progress bar
  progressBarProgress: number; //progress of the progress bar - between 0 and 1
  numberOfQuizWords: number; //number of quiz words for the progress bar
  quiz: Quiz = null; //the quiz
  quizWords: QuizWord[] = []; //the quiz words
  isProgressSaved:boolean = false;
  audioPath:string;

  slideOpts = {
    initialSlide: 0,
    allowTouchMove: false
  };

  constructor(private categoryService: CategoryService,
              private alertCtrl: AlertController,
              private translate: TranslateService,
              private router: Router,
              private routingService: RoutingService,
              private controller: ControllerService,
              private nativeAudio: NativeAudio,
              private config: ConfigService) {
  }

  ngOnInit() {
  }

  //called every time this page is entered - even if it is already instantiated
  ionViewWillEnter(){
    //set quiz
    this.quiz = this.categoryService.getQuiz();
    this.isProgressSaved = false;
    //set quizwords and number of quizwords. catch the case quiz is undefined which happens when the app gets instatiated in the quiz screen
    try{
      this.quizWords = this.quiz.quizWords;
      this.numberOfQuizWords = this.quiz.quizWords.length;
    } catch (e) {
      //print stack trace and error message because its clear whats going wrong here
      console.log(e);
      console.log(this.translate.instant("ERROR.QUIZ_PAGE_QUIZ_UNDEFINED"));
      return;
    }
    //set Audio Path
    this.audioPath = 'assets/audio/' + this.config.getCurrentDialect().name + '/';
    this.loadSounds();
  }

  private loadSounds(){
    for(let i = 0; i < this.numberOfQuizWords; i++){
      let path = this.audioPath + this.quizWords[i].word.pronunciationPath + '.mp3';
      this.nativeAudio.preloadSimple(this.quizWords[i].word.pronunciationPath, path)
    }
  }
  /**
   * Plays a sound found on given path
   * @param pronunciationPath relative path to mp3 as string
   */
  playSound(pronunciationPath: string){
    //preload the sound. Im not sure this is necessary. Im sure this should be done when the page loads - if we find no
    //performance issues we just forget this ;)
    //the path to the mp3 also works as id and play then
    this.nativeAudio.play(pronunciationPath);
  }

  submitAnswer(indexOfAnswer: number, currentQuizWord: QuizWord){
    if(!this.buttonsActive) return;

    this.answerColorArray[indexOfAnswer] = "danger";

    for(let i = 0; i < currentQuizWord.answerOptions.length; i++){
      if(currentQuizWord.testAnswer(currentQuizWord.answerOptions[i])){
        this.answerColorArray[i] = "success";
      }
    }
    this.buttonsActive = false;

    //what a bummer... to find out how the buttons are colored we have to test the answers. but testing the answers also
    // triggers the result, so in the end we have to test again the really selected answer. :D
    currentQuizWord.testAnswer(currentQuizWord.answerOptions[indexOfAnswer]);
  }

  nextSlide(slides){
    slides.getActiveIndex().then(index =>{
      if(!(index === this.numberOfQuizWords - 1)){
        this.answerColorArray = ["primary", "primary", "primary", "primary"];
        this.buttonsActive = true;
        slides.slideNext();
      } else {
        this.controller.setProgressQuiz(this.categoryService.getCategory(), this.quiz.getPercentage());
        this.isProgressSaved = true;
        this.router.navigate(['quiz/end-card']);
      }
    });
  }

  /**
   * This is a bit hacky, we need to know if there is a translation word but i want to check both, its undefined or empty.
   * It seems that double checks are not (easily) possible in html+angular, so we do it this way.
   * @param vocWord the word we build the string for
   */
  //(i found that it is easily possible with '==' instead of '===', but it dosnt work either. :)
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
    if(!this.isProgressSaved) {
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
    } else {
      this.directToHome();
    }
  }

  /**
   * navigate to home page
   */
  directToHome(){
    this.router.navigate(['home'])
  }

  isLastSlide(index){
    return index === this.numberOfQuizWords - 1;
  }
}
