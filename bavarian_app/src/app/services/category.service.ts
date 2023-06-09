import { Injectable } from '@angular/core';
import {Level} from "../../entities/Level";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {Quiz} from "../../entities/Quiz";
import {Category} from "../../entities/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private gamemode:number = -1;
  private levels: Level[] = [];
  private category: Category;
  private vocabularyWords: VocabularyWord[] = [];
  private quiz: Quiz = null;

  constructor() {
  }

  public setQuiz(quiz:Quiz):void{
    this.quiz = quiz;
  }
  public getQuiz():Quiz{
    return this.quiz;
  }

  public setCategory(cat:Category):void{
    this.category = cat;
  }
  public getCategory():Category{
    return this.category;
  }
  public setGamemode(gamemode:number):void{
    this.gamemode = gamemode;
  }

  public getGamemode():number{
    return this.gamemode;
  }

  public setLevels(levels: Level[]):void{
    this.levels = levels;
    this.sortLevels();
  }

  public getLevels():Level[]{
    return this.levels;
  }

  public setVocabulayWords(vocabularyWords:VocabularyWord[]){
    this.vocabularyWords = vocabularyWords;
  }

  public getVocabulayWords():VocabularyWord[]{
    return this.vocabularyWords;
  }

  private sortLevels(){
    this.levels.sort((level1:Level, level2:Level) => level1.id - level2.id);
  }
}
