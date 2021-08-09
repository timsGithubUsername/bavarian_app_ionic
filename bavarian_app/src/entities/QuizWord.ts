import {VocabularyWord} from "./VocabularyWord";

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
   * Returns the values of QuizWord as an Object.
   */
  getValues():{
    word:VocabularyWord,
    answerOptions:VocabularyWord[]
  };
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
