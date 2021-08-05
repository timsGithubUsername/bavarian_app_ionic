import {VocabularyWord} from "./VocabularyWord";

export interface QuizWord{

  getWord():VocabularyWord;

  getAnwerOptions():VocabularyWord[];

  testAnswer(word:VocabularyWord):boolean;

}
