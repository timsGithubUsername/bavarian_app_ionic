import {QuizWordFactory} from "./QuizWordFactory";
import {VocabularyWord} from "../VocabularyWord";
import {QuizWordMutable, TestResult} from "../QuizWord";

export class QuizWordFactoryImpl implements QuizWordFactory {
  createQuizWord(word: VocabularyWord, answerOptions: VocabularyWord[]): QuizWordMutable {
    return new QuizWordImpl(word,answerOptions);
  }

}

class QuizWordImpl implements QuizWordMutable {

  word:VocabularyWord;
  answerOptions:VocabularyWord[];
  private testResult:TestResult;

  constructor(word:VocabularyWord,answerOptions:VocabularyWord[]) {
    this.setWord(word);
    this.setAnswerOptions(answerOptions);
    this.testResult = TestResult.Untested
  }

  /**
   * Sets the answer options to the question
   * @param answers
   */
  setAnswerOptions(answers: VocabularyWord[]): void {
    this.answerOptions = answers.slice();
  }

  /**
   * Sets the word of the question
   * @param word
   */
  setWord(word: VocabularyWord): void {
    this.word = word;
  }

  /**
   * Shuffles through the answer options
   */
  shuffle(): void {
    let shuffled:VocabularyWord[] = [];
    while(this.answerOptions.length != 0){
      shuffled.push(this.answerOptions.splice(Math.random()*this.answerOptions.length,1)[0])
    }
    this.answerOptions = shuffled;
  }

  /**
   * Tests whether the answer is the right one to the question
   * @param word - The word to be tested
   */
  testAnswer(word: VocabularyWord): boolean {
    let ret = word === this.word
    this.testResult = ret ? TestResult.Correct : TestResult.Incorrect
    return ret;
  }


  getTestResult(): TestResult {
    return this.testResult;
  }


}
