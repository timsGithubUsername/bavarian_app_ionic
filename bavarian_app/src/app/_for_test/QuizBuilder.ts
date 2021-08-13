import {QuizFactoryImpl} from "../../entities/factory/QuizFactoryImpl";
import {QuizWordFactoryImpl} from "../../entities/factory/QuizWordFactoryImpl";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWordsBuilder} from "./VocabularyWordsBuilder";

export class QuizBuilder{
  quizWordFactory = new QuizWordFactoryImpl();
  quizFactory = new QuizFactoryImpl();
  vocabularyWordsBuilder = new VocabularyWordsBuilder();

  quiz: Quiz;

  constructor() {
    this.quiz = this.quizFactory.createQuiz(this.vocabularyWordsBuilder.vocabularyWords, this.quizWordFactory);
  }
}
