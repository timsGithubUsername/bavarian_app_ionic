import { Component, OnInit } from '@angular/core';
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {CategoryService} from "../services/category.service";
import {RoutingService} from "../services/routing.service";
import {ControllerService} from "../services/controller/controller.service";
import {Router} from "@angular/router";

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

  constructor(private nativeAudio: NativeAudio,
              private categoryService: CategoryService,
              private routingService: RoutingService,
              private controller: ControllerService,
              private router: Router) {
    //get vocabulary words
    this.vocabularyWords = categoryService.getVocabulayWords();
    //set the length
    this.numberOfVocabularyWords = this.vocabularyWords.length;
  }

  ngOnInit() {
  }

  /**
   * Plays a sound found on given path
   * @param pronunciationPath relative path to mp3 as string
   */
  playSound(pronunciationPath: string){
    //preload the sound. Im not sure this is neccessary. Im sure this should be done when the page loads - if we find no
    //performance issues we just forget this ;)
    //the path to the mp3 also works as id
    this.nativeAudio.preloadSimple(pronunciationPath, pronunciationPath);
    //play the preloaded sound
    this.nativeAudio.play(pronunciationPath);
  }

  /**
   * calculate the progress of the progress bar, uses numberOfVocabularyWords
   * @param i current index
   */
  buildProgressBar(i:number):string{
    this.ngForIndex = i + 1;
    this.progressBarProgress = this.ngForIndex / this.numberOfVocabularyWords;
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
      return 'undefined';
    }
    //else return string
    else {
      return output;
    }
  }

  buildTranslationWord(vocWord: VocabularyWord):string{
    let output = "";

    //if translation word is not undefined
    if(typeof vocWord.translationWord !== undefined){
      output = output + vocWord.translationWord;
    }

    //if length is zero return undefined
    if(output === ""){
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
