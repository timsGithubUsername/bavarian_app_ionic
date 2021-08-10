import {QuizFactory} from "./QuizFactory";
import {VocabularyWord} from "../VocabularyWord";
import {QuizMutable, QuizValue} from "../Quiz";
import {Category} from "../Category";
import {Dialect} from "../Dialect";
import {QuizWord, QuizWordValue, TestResult} from "../QuizWord";
import {QuizWordFactory} from "./QuizWordFactory";

export class QuizFactoryImpl implements QuizFactory{

  createQuiz(words: VocabularyWord[],quizWordFactory:QuizWordFactory): QuizMutable {
    return new QuizImpl(words,4,quizWordFactory);
  }

}

class QuizImpl implements QuizMutable{

  private quizWords:QuizWord[];

  private correctAnswers : number
  private incorrectAnswers : number

  constructor(words:VocabularyWord[],numberOfAnswers:number,quizWordFactory:QuizWordFactory) {

    if(numberOfAnswers > words.length)numberOfAnswers = words.length;

    this.correctAnswers = 0;
    this.incorrectAnswers = 0;

    /*
    Create a QuizWord object for each word passed.
     */
    words.forEach((value ,index)  => {

      let possibleWords = words;
      let answerOptions:VocabularyWord[] = [];

      possibleWords.splice(index,1,);

      for(let i = numberOfAnswers-1;i > 0;i--) {
        let randomIndex = Math.random() * possibleWords.length
        answerOptions.push(possibleWords[randomIndex]);
        possibleWords.splice(randomIndex,1);
      }

      answerOptions.push(value);
      let currentQuizWord = quizWordFactory.createQuizWord(value,answerOptions)
      currentQuizWord.shuffle();
      this.quizWords.push(currentQuizWord);
    })

  }

  private updateTested():void{
    let that = this;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.getQuizWords().forEach(word => {
      switch (word.getTestResult()){
        case TestResult.Correct:
          that.correctAnswers++;
          break;
        case TestResult.Incorrect:
          that.incorrectAnswers++;
          break;
      }
    })
  }

  getCategory(): Category {
    return this.quizWords[0].getWord().getCategory();
  }

  getDialect(): Dialect {
    return this.quizWords[0].getWord().getDialectWord().getDialect();
  }

  getNumberOfCorrectAnswers(): number {
    this.updateTested()
    return this.correctAnswers;
  }

  getNumberOfFalseAnswers(): number {
    this.updateTested()
    return this.incorrectAnswers;
  }

  getNumberOfRemainingQuestions(): number {
    this.updateTested()
    return this.quizWords.length - (this.correctAnswers + this.incorrectAnswers);
  }

  getPercentage(): number {
    if(this.correctAnswers === 0){
      return 0;
    }else{
      return this.correctAnswers / (this.correctAnswers + this.incorrectAnswers);
    }
  }

  getQuizWords(): QuizWord[] {
    return this.quizWords;
  }

  getSize(): number {
    return this.quizWords.length;
  }

  setQuizWords(quizWords: QuizWord[]): void {
    this.quizWords = quizWords;
  }



  getValues(): QuizValue {
    let that = this;
    function getQuizWordsValues(): QuizWordValue[] {
      let values: QuizWordValue[] = [];
      that.getQuizWords().forEach(v => values.push(v.getValues()));
      return values;
    }

    return {
      category: this.getCategory().getValues(),
      dialect: this.getDialect().getValues(),
      numberOfCorrectAnswers: this.getNumberOfCorrectAnswers(),
      numberOfIncorrectAnswers: this.getNumberOfFalseAnswers(),
      numberOfRemainingQuestions: this.getNumberOfRemainingQuestions(),
      percentage: this.getPercentage(),
      quizWords: getQuizWordsValues(),
      size: this.getSize()
    };
  }
}
