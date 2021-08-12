import {QuizWord} from "./QuizWord";

export interface Quiz{

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
  readonly quizWords:QuizWord[];

}



export interface QuizMutable extends Quiz{

  /**
   * Sets all questions
   * @param quizWords
   */
  setQuizWords(quizWords:QuizWord[]):void;

}
