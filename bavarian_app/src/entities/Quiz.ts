import {Category, CategoryValue} from "./Category";
import {Dialect, DialectValue} from "./Dialect";
import {QuizWord, QuizWordValue} from "./QuizWord";

export interface Quiz{

  /**
   * Returns the length of the quiz
   */
  getSize():number;

  /**
   * Returns the dialect of the quiz
   */
  getDialect():Dialect;

  /**
   * Returns the category of the quiz
   */
  getCategory():Category;

  /**
   * Returns the percentage of correct answers so far in relation to unanswered and incorrect answers.
   */
  getPercentage():number;

  /**
   * Returns the number of correctly answered questions
   */
  getNumberOfCorrectAnswers():number;

  /**
   * Returns the number of questions answered incorrectly so far
   */
  getNumberOfFalseAnswers():number;

  /**
   * Returns the number of unanswered questions of the quiz
   */
  getNumberOfRemainingQuestions():number;

  /**
   * Returns all questions as a list
   */
  getQuizWords():QuizWord[];

  /**
   * Returns the values of Quiz as an Object.
   */
  getValues():QuizValue;
}

export interface QuizValue{
  size:number,
  dialect:DialectValue,
  category:CategoryValue,
  percentage:number,
  numberOfCorrectAnswers:number,
  numberOfIncorrectAnswers:number,
  numberOfRemainingQuestions:number,
  quizWords:QuizWordValue[]
}


export interface QuizMutable extends Quiz{

  /**
   * Sets all questions
   * @param quizWords
   */
  setQuizWords(quizWords:QuizWord[]):void;

}
