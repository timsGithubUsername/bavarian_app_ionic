import {QuizFactory} from "./QuizFactory";
import {VocabularyWord} from "../VocabularyWord";
import {QuizMutable} from "../Quiz";
import {QuizWord, TestResult} from "../QuizWord";
import {QuizWordFactory} from "./QuizWordFactory";

export class QuizFactoryImpl implements QuizFactory{

  createQuiz(words: VocabularyWord[],quizWordFactory:QuizWordFactory): QuizMutable {
    return new QuizImpl(words,4,quizWordFactory);
  }

}

class QuizImpl implements QuizMutable{

  quizWords:QuizWord[];

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
    this.quizWords.forEach(word => {
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


  setQuizWords(quizWords: QuizWord[]): void {
    this.quizWords = quizWords;
  }

}
