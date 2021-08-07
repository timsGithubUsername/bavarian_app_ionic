import {VocabularyWord} from "../VocabularyWord.js";
import {QuizMutable} from "../Quiz.js";
import {QuizWordFactory} from "./QuizWordFactory.js";

export interface QuizFactory {

  createQuiz(words:VocabularyWord[],quizWordFactory:QuizWordFactory):QuizMutable;


}
