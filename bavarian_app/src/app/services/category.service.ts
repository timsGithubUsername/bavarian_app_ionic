import { Injectable } from '@angular/core';
import {Level} from "../../entities/Level";
import {VocabularyWord} from "../../entities/VocabularyWord";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private gamemode:number;
  private levels: Level[];
  private vocabularyWords: VocabularyWord[] = [];

  constructor() {
    this.gamemode = -1;
    this.levels = [];
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
