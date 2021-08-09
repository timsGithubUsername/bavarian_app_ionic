import {QuizWordMutable} from "../QuizWord";
import {VocabularyWord} from "../VocabularyWord";

export interface QuizWordFactory {

  createQuizWord(word:VocabularyWord,answerOptions:VocabularyWord[]):QuizWordMutable;

}
