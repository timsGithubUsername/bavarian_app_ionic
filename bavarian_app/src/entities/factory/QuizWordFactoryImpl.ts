import {QuizWordFactory} from "./QuizWordFactory";
import {VocabularyWord, VocabularyWordValue} from "../VocabularyWord";
import {QuizWordMutable, QuizWordValue, TestResult} from "../QuizWord";

export class QuizWordFactoryImpl implements QuizWordFactory {
  createQuizWord(word: VocabularyWord, answerOptions: VocabularyWord[]): QuizWordMutable {
    return new QuizWordImpl(word,answerOptions);
  }

}

class QuizWordImpl implements QuizWordMutable {

  private word:VocabularyWord;
  private answerOptions:VocabularyWord[];
  private testResult:TestResult;

  constructor(word:VocabularyWord,answerOptions:VocabularyWord[]) {
    this.setWord(word);
    this.setAnswerOptions(answerOptions);
    this.testResult = TestResult.Untested
  }

  /**
   * Returns the answer options to the question
   */
  getAnswerOptions(): VocabularyWord[] {
    return this.answerOptions;
  }

  /**
   * Returns the word of the question
   */
  getWord(): VocabularyWord {
    return this.word;
  }

  /**
   * Sets the answer options to the question
   * @param answers
   */
  setAnswerOptions(answers: VocabularyWord[]): void {
    this.answerOptions = answers;
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
    let ret = word.getId() === this.word.getId()
    this.testResult = ret ? TestResult.Correct : TestResult.Incorrect
    return ret;
  }

  getValues(): QuizWordValue {
    let that = this;
    function getAnswerOptionValues():VocabularyWordValue[]{
      let values:VocabularyWordValue[] = [];
      that.getAnswerOptions().forEach(v => values.push(v.getValues()))
      return values;
    }
    return {
      answerOptions: getAnswerOptionValues(),
      word: this.getWord().getValues()};
  }

  getTestResult(): TestResult {
    return this.testResult;
  }

}
