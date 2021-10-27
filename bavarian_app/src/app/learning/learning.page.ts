import { Component, OnInit } from '@angular/core';
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {CategoryService} from "../services/category.service";
import {RoutingService} from "../services/routing.service";
import {ControllerService} from "../services/controller/controller.service";
import {Router} from "@angular/router";
import {AppInjector} from "../app.module";
import {ProgressService} from "../services/progress.service";
import {Category} from "../../entities/Category";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
  ngForIndex: number; //index of current Vocabulary Word
  numberOfVocabularyWords: number; //count of Vocabulary Words
  progressBarProgress: number; //Progress of.. the progress bar (from 0 to 1)
  vocabularyWords: VocabularyWord[] = []; //Vocabulary Words of this lecture
  audioPath:string;

  slideOpts = {
    initialSlide: 0
  };

  constructor(private nativeAudio: NativeAudio, //to play mp3
              private categoryService: CategoryService, //to get the VocabularyWord[]
              private routingService: RoutingService, //to redirect after the lesson
              private controller: ControllerService, //to redirect after the lesson
              private router: Router,
              private config: ConfigService) { //to set the router. This is only necessary in case the user starts the app in this screen. this shouldnt possible, but you never know...
  }

  ngOnInit() {
  }

  //called every time this page is entered - even if it is already instantiated
  ionViewWillEnter(){
    //get vocabulary words
    this.vocabularyWords = this.categoryService.getVocabulayWords();
    //set the length
    this.numberOfVocabularyWords = this.vocabularyWords.length;
    //set Audio Path
    this.audioPath = 'assets/audio/' + this.config.getCurrentDialect().name + '/';
    this.loadSounds();
  }

  private loadSounds() {
    for (let i = 0; i < this.numberOfVocabularyWords; i++) {
      let path = this.audioPath + this.vocabularyWords[i].pronunciationPath + '.mp3';
      this.nativeAudio.preloadSimple(this.vocabularyWords[i].pronunciationPath, path)
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

  /**
   * calculate the progress of the progress bar, uses numberOfVocabularyWords
   * @param i current index
   */
  buildProgressBar(i:number):string{
    //set the current index of the slides
    this.ngForIndex = i + 1;
    //calculate the progress and set the value
    this.progressBarProgress = this.ngForIndex / this.numberOfVocabularyWords;
    //return the string to show
    return this.ngForIndex + "/" + this.numberOfVocabularyWords;
  }

  /**
   * Builds the string to show in info card. should return 'undefined' if string length is zero!
   * @param vocWord the word we build the string for
   */
  buildAnnotationAndDescribtion(vocWord: VocabularyWord):string{
    let output = "";

    //if annotation is not undefined
    if(typeof vocWord.annotation !== undefined){
      output = output + vocWord.annotation
    }

    //if describtion is not undefined
    //todo same for Describtion

    //if length is zero return undefined
    if(output === ""){
      //it works here with undefined without quotes but for some reason not in the similar next method which is used similar... wtf...
      //so it returns a string for consistency, undefined is anyway interpreted as string in html
      //the string is needed to check if we show the info FAB
      return 'undefined';
    }
    //else return string
    else {
      return output;
    }
  }

  /**
   * This is a bit hacky, we need to know if there is a translation word but i want to check both, its undefined or empty.
   * It seems that double checks are not (easily) possible in html+angular, so we do it this way.
   * @param vocWord the word we build the string for
   */
  buildTranslationWord(vocWord: VocabularyWord):string{
    let output = "";

    //if translation word is not undefined
    if(typeof vocWord.translationWord !== undefined){
      output = output + vocWord.translationWord;
    }

    //if length is zero return undefined
    //like above, for some reason undefined without quotes dont work.
    //undefined is needed to check if the german word should be shown in italy or not also if we show the translation word
    if(output === ""){
      return 'undefined';
    }
    //else return string
    else {
      return output;
    }
  }

  lastSlide(slides){
    slides.getActiveIndex().then(index => {
      if(index === this.numberOfVocabularyWords) {
        this.controller.setProgressLearning(this.categoryService.getCategory());
      }
    });
  }
  /**
   * navigate to next slide
   * @param slide the slider element
   */
  nextSlide(slide){
    slide.slideNext();
  }

  /**
   * navigate to previous slide
   * @param slide the slider element
   */
  prevSlide(slide){
    slide.slidePrev();
  }

  /**
   * navigate to first slide
   * @param slide the slider element
   */
  slideToFirst(slide){
    slide.slideTo(0, 2000);
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
