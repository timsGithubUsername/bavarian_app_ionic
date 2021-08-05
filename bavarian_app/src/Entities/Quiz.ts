import {Category} from "./Category.js";
import {Dialect} from "./Dialect";
import {QuizWord} from "./QuizWord";

export interface Quiz{

  getSize():number;

  getDialect():Dialect;

  getCategory():Category;

  getPercentage():number;

  getNumberOfCorrectAnswers():number;

  getQuizWords():QuizWord[];


}
