import { Component, OnInit } from '@angular/core';
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  audio: string = 'assets/audio/test_sound.mp3'; //todo mock
  bayrisch: string = 'servus'; //todo mock
  deutsch: string = 'hallo'; //todo mock
  count: string = '8/12'; //todo mock

  ngForIndex: number;
  numberOfVocabularyWords: number;
  progressBarProgress: number;
  vocabularyWords: VocabularyWord[] = [];

  constructor(private nativeAudio: NativeAudio,
              private categoryService: CategoryService) {
    this.nativeAudio.preloadSimple("1", this.audio);
    this.vocabularyWords = categoryService.getVocabulayWords();
    this.numberOfVocabularyWords = this.vocabularyWords.length;
  }

  ngOnInit() {
  }

  playSound(pronunciationPath: string){
    this.nativeAudio.play(pronunciationPath);
  }

  buildProgressBar(i:number):string{
    this.ngForIndex = i + 1;
    this.progressBarProgress = this.ngForIndex / this.numberOfVocabularyWords;

    return this.ngForIndex + "/" + this.numberOfVocabularyWords;
  }

}
