import {VocabularyWord} from "../VocabularyWord";
import {QuizMutable} from "../Quiz";
import {QuizWordFactory} from "./QuizWordFactory";

export interface QuizFactory {

  createQuiz(words:VocabularyWord[],quizWordFactory:QuizWordFactory):QuizMutable;


}
