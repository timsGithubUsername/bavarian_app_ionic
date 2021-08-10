import {VocabularyWord, VocabularyWordValue} from "./VocabularyWord";

export interface QuizWord{

  /**
   * Returns the word of the question
   */
  getWord():VocabularyWord;

  /**
   * Returns the answer options to the question
   */
  getAnswerOptions():VocabularyWord[];

  /**
   * Shuffles through the answer options
   */
  shuffle():void;

  /**
   * Tests whether the answer is the right one to the question
   * @param word - The word to be tested
   */
  testAnswer(word:VocabularyWord):boolean;

  /**
   * Returns wether the test is correct,incorrect or untested
   */
  getTestResult():TestResult;

  /**
   * Returns the values of QuizWord as an Object.
   */
  getValues():QuizWordValue;
}

export interface QuizWordValue{
  word:VocabularyWordValue,
  answerOptions:VocabularyWordValue[]
}

export enum TestResult{
  Incorrect,
  Correct,
  Untested
}

export interface QuizWordMutable extends QuizWord {

  /**
   * Sets the word of the question
   * @param word
   */
  setWord(word:VocabularyWord):void;

  /**
   * Sets the answer options to the question
   * @param answers
   */
  setAnswerOptions(answers:VocabularyWord[]):void;
}
