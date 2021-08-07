import {QuizWordMutable} from "../QuizWord.js";
import {VocabularyWord} from "../VocabularyWord.js";

export interface QuizWordFactory {

  createQuizWord(word:VocabularyWord,answerOptions:VocabularyWord[]):QuizWordMutable;

}
