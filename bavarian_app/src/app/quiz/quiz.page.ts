import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWord} from "../../entities/VocabularyWord";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  image: string = 'assets/img/img_not_found.jpg'; //todo mock
  answer: string = 'test answer'; //todo mock

  quiz: Quiz;

  constructor(private categorieService: CategoryService) {
    this.quiz = categorieService.getQuiz();
  }

  ngOnInit() {
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
}
