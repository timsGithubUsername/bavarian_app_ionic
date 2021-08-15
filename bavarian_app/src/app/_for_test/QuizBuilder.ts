import {QuizFactoryImpl} from "../../entities/factory/QuizFactoryImpl";
import {QuizWordFactoryImpl} from "../../entities/factory/QuizWordFactoryImpl";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWordsBuilder} from "./VocabularyWordsBuilder";

/**
 * Use the factories in entities package to build some objects for system tests
 */
export class QuizBuilder{
  quizWordFactory = new QuizWordFactoryImpl();
  quizFactory = new QuizFactoryImpl();
  vocabularyWordsBuilder = new VocabularyWordsBuilder();

  quiz: Quiz;

  constructor() {
    this.quiz = this.quizFactory.createQuiz(this.vocabularyWordsBuilder.vocabularyWords, this.quizWordFactory);
  }
}
